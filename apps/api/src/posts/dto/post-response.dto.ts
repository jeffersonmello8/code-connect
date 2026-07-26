import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class PostAuthorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  handle: string;
}

export class PostResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  code: string | null;

  @ApiProperty({ nullable: true })
  thumbnailUrl: string | null;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty({ type: PostAuthorDto })
  author: PostAuthorDto;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  commentsCount: number;

  @ApiProperty()
  likedByMe: boolean;

  @ApiProperty()
  createdAt: string;
}

export class PaginatedPostsResponseDto {
  @ApiProperty({ type: [PostResponseDto] })
  data: PostResponseDto[];

  @ApiProperty()
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export class CommentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ type: PostAuthorDto })
  author: PostAuthorDto;

  @ApiProperty({ nullable: true })
  parentId: string | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: [CommentResponseDto] })
  replies: CommentResponseDto[];
}

export class PostDetailResponseDto extends PostResponseDto {
  @ApiProperty({ type: [CommentResponseDto] })
  comments: CommentResponseDto[];
}

export function toAuthorDto(user: UserResponseDto): PostAuthorDto {
  const handle = user.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  return {
    id: user.id,
    name: user.name,
    handle: `@${handle}`,
  };
}
