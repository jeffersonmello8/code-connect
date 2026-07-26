import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ListPostsQueryDto } from './dto/list-posts-query.dto';
import {
  CommentResponseDto,
  PaginatedPostsResponseDto,
  PostDetailResponseDto,
  PostResponseDto,
  toAuthorDto,
} from './dto/post-response.dto';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Post } from './entities/post.entity';

interface PostCounts {
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(
    query: ListPostsQueryDto,
    currentUserId?: string,
  ): Promise<PaginatedPostsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;
    const searchTerm = query.q?.trim();

    const qb = this.postsRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author');

    if (searchTerm) {
      qb.andWhere(
        `post.search_vector @@ plainto_tsquery('portuguese', :searchTerm)`,
        {
          searchTerm,
        },
      );
      qb.addSelect(
        `ts_rank(post.search_vector, plainto_tsquery('portuguese', :searchTerm))`,
        'search_rank',
      );
    }

    if (query.sort === 'popular') {
      qb.addSelect(
        (subQuery) =>
          subQuery
            .select('COUNT(like.id)', 'count')
            .from(Like, 'like')
            .where('like.post_id = post.id'),
        'likes_count',
      ).orderBy('likes_count', 'DESC', 'NULLS LAST');
    } else if (searchTerm) {
      qb.orderBy('search_rank', 'DESC');
    } else {
      qb.orderBy('post.createdAt', 'DESC');
    }

    qb.skip(skip).take(limit);

    const [posts, total] = await qb.getManyAndCount();
    const postIds = posts.map((post) => post.id);
    const countsMap = await this.getCountsForPosts(postIds, currentUserId);

    return {
      data: posts.map((post) =>
        this.toPostResponse(post, countsMap.get(post.id) ?? this.emptyCounts()),
      ),
      meta: { page, limit, total },
    };
  }

  async findOne(
    id: string,
    currentUserId?: string,
  ): Promise<PostDetailResponseDto> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const countsMap = await this.getCountsForPosts([post.id], currentUserId);
    const counts = countsMap.get(post.id) ?? this.emptyCounts();
    const comments = await this.getNestedComments(post.id);

    return {
      ...this.toPostResponse(post, counts),
      comments,
    };
  }

  async create(dto: CreatePostDto, authorId: string): Promise<PostResponseDto> {
    const post = this.postsRepository.create({
      title: dto.title.trim(),
      description: dto.description.trim(),
      code: dto.code?.trim() ?? null,
      thumbnailUrl: dto.thumbnailUrl ?? null,
      tags: dto.tags.map((tag) => tag.trim()).filter(Boolean),
      authorId,
    });

    const savedPost = await this.postsRepository.save(post);
    const withAuthor = await this.postsRepository.findOne({
      where: { id: savedPost.id },
      relations: { author: true },
    });

    if (!withAuthor) {
      throw new NotFoundException('Post não encontrado após criação');
    }

    return this.toPostResponse(withAuthor, this.emptyCounts());
  }

  async likePost(postId: string, userId: string): Promise<void> {
    await this.ensurePostExists(postId);

    const existingLike = await this.likesRepository.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      throw new ConflictException('Post já curtido');
    }

    await this.likesRepository.save(
      this.likesRepository.create({ postId, userId }),
    );
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    await this.ensurePostExists(postId);

    const like = await this.likesRepository.findOne({
      where: { postId, userId },
    });

    if (!like) {
      throw new NotFoundException('Curtida não encontrada');
    }

    await this.likesRepository.remove(like);
  }

  async createComment(
    postId: string,
    userId: string,
    dto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    await this.ensurePostExists(postId);

    if (dto.parentId) {
      const parent = await this.commentsRepository.findOne({
        where: { id: dto.parentId, postId },
      });

      if (!parent) {
        throw new NotFoundException('Comentário pai não encontrado');
      }

      if (parent.parentId) {
        throw new UnprocessableEntityException(
          'Respostas aninhadas suportam apenas um nível',
        );
      }
    }

    const comment = await this.commentsRepository.save(
      this.commentsRepository.create({
        postId,
        authorId: userId,
        body: dto.body.trim(),
        parentId: dto.parentId ?? null,
      }),
    );

    const withAuthor = await this.commentsRepository.findOne({
      where: { id: comment.id },
      relations: { author: true },
    });

    if (!withAuthor) {
      throw new NotFoundException('Comentário não encontrado após criação');
    }

    return this.toCommentResponse(withAuthor, []);
  }

  private async ensurePostExists(postId: string): Promise<void> {
    const exists = await this.postsRepository.exists({ where: { id: postId } });
    if (!exists) {
      throw new NotFoundException('Post não encontrado');
    }
  }

  private async getCountsForPosts(
    postIds: string[],
    currentUserId?: string,
  ): Promise<Map<string, PostCounts>> {
    const map = new Map<string, PostCounts>();

    if (postIds.length === 0) {
      return map;
    }

    const likesCounts = await this.likesRepository
      .createQueryBuilder('like')
      .select('like.post_id', 'postId')
      .addSelect('COUNT(like.id)', 'count')
      .where('like.post_id IN (:...postIds)', { postIds })
      .groupBy('like.post_id')
      .getRawMany<{ postId: string; count: string }>();

    const commentsCounts = await this.commentsRepository
      .createQueryBuilder('comment')
      .select('comment.post_id', 'postId')
      .addSelect('COUNT(comment.id)', 'count')
      .where('comment.post_id IN (:...postIds)', { postIds })
      .groupBy('comment.post_id')
      .getRawMany<{ postId: string; count: string }>();

    let likedPostIds = new Set<string>();

    if (currentUserId) {
      const userLikes = await this.likesRepository.find({
        where: { postId: In(postIds), userId: currentUserId },
        select: { postId: true },
      });
      likedPostIds = new Set(userLikes.map((like) => like.postId));
    }

    for (const postId of postIds) {
      map.set(postId, {
        likesCount: 0,
        commentsCount: 0,
        likedByMe: likedPostIds.has(postId),
      });
    }

    for (const row of likesCounts) {
      const current = map.get(row.postId);
      if (current) {
        current.likesCount = parseInt(row.count, 10);
      }
    }

    for (const row of commentsCounts) {
      const current = map.get(row.postId);
      if (current) {
        current.commentsCount = parseInt(row.count, 10);
      }
    }

    return map;
  }

  private async getNestedComments(
    postId: string,
  ): Promise<CommentResponseDto[]> {
    const comments = await this.commentsRepository.find({
      where: { postId },
      relations: { author: true },
      order: { createdAt: 'ASC' },
    });

    const topLevel = comments.filter((comment) => !comment.parentId);
    const repliesByParent = new Map<string, Comment[]>();

    for (const comment of comments) {
      if (comment.parentId) {
        const replies = repliesByParent.get(comment.parentId) ?? [];
        replies.push(comment);
        repliesByParent.set(comment.parentId, replies);
      }
    }

    return topLevel.map((comment) =>
      this.toCommentResponse(
        comment,
        (repliesByParent.get(comment.id) ?? []).map((reply) =>
          this.toCommentResponse(reply, []),
        ),
      ),
    );
  }

  private toPostResponse(post: Post, counts: PostCounts): PostResponseDto {
    const authorUser: UserResponseDto = this.usersService.toResponse(
      post.author,
    );

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      code: post.code,
      thumbnailUrl: post.thumbnailUrl,
      tags: post.tags,
      author: toAuthorDto(authorUser),
      likesCount: counts.likesCount,
      commentsCount: counts.commentsCount,
      likedByMe: counts.likedByMe,
      createdAt: post.createdAt.toISOString(),
    };
  }

  private toCommentResponse(
    comment: Comment,
    replies: CommentResponseDto[],
  ): CommentResponseDto {
    const authorUser: UserResponseDto = this.usersService.toResponse(
      comment.author,
    );

    return {
      id: comment.id,
      body: comment.body,
      author: toAuthorDto(authorUser),
      parentId: comment.parentId,
      createdAt: comment.createdAt.toISOString(),
      replies,
    };
  }

  private emptyCounts(): PostCounts {
    return {
      likesCount: 0,
      commentsCount: 0,
      likedByMe: false,
    };
  }
}
