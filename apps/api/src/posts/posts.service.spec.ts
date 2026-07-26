import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: jest.Mocked<Repository<Post>>;
  let likesRepository: jest.Mocked<Repository<Like>>;

  const author = {
    id: 'author-id',
    name: 'Julio Santos',
    email: 'julio@example.com',
    passwordHash: 'hash',
  };

  const post: Post = {
    id: 'post-id',
    title: 'Titulo',
    description: 'Descricao',
    code: null,
    thumbnailUrl: null,
    tags: ['React'],
    authorId: author.id,
    author,
    likes: [],
    comments: [],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            exists: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Like),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            toResponse: jest.fn().mockReturnValue({
              id: author.id,
              name: author.name,
              email: author.email,
            }),
          },
        },
      ],
    }).compile();

    service = module.get(PostsService);
    postsRepository = module.get(getRepositoryToken(Post));
    likesRepository = module.get(getRepositoryToken(Like));
  });

  it('should create a post', async () => {
    const dto: CreatePostDto = {
      title: 'Novo post',
      description: 'Descricao do post',
      tags: ['React'],
    };

    postsRepository.create.mockReturnValue(post);
    postsRepository.save.mockResolvedValue(post);
    postsRepository.findOne.mockResolvedValue(post);

    const result = await service.create(dto, author.id);

    expect(result.title).toBe('Titulo');
    expect(result.author.handle).toBe('@julio_santos');
  });

  it('should throw ConflictException when liking twice', async () => {
    postsRepository.exists.mockResolvedValue(true);
    likesRepository.findOne.mockResolvedValue({
      id: 'like-id',
      postId: post.id,
      userId: author.id,
      post,
      user: author,
      createdAt: new Date(),
    });

    await expect(service.likePost(post.id, author.id)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw NotFoundException when post does not exist', async () => {
    postsRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
