import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtOptionalAuthGuard } from '../auth/guards/jwt-optional-auth.guard';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ListPostsQueryDto } from './dto/list-posts-query.dto';
import {
  CommentResponseDto,
  PaginatedPostsResponseDto,
  PostDetailResponseDto,
  PostResponseDto,
} from './dto/post-response.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtOptionalAuthGuard)
  @ApiOperation({ summary: 'Listar posts com busca full-text e paginação' })
  @ApiOkResponse({ type: PaginatedPostsResponseDto })
  findAll(
    @Query() query: ListPostsQueryDto,
    @CurrentUser() user?: UserResponseDto,
  ): Promise<PaginatedPostsResponseDto> {
    return this.postsService.findAll(query, user?.id);
  }

  @Get(':id')
  @UseGuards(JwtOptionalAuthGuard)
  @ApiOperation({ summary: 'Obter detalhes de um post com comentários' })
  @ApiOkResponse({ type: PostDetailResponseDto })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user?: UserResponseDto,
  ): Promise<PostDetailResponseDto> {
    return this.postsService.findOne(id, user?.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo post' })
  @ApiCreatedResponse({ type: PostResponseDto })
  @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' })
  create(
    @Body() dto: CreatePostDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<PostResponseDto> {
    return this.postsService.create(dto, user.id);
  }

  @Post(':id/likes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Curtir um post' })
  @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' })
  @ApiConflictResponse({ description: 'Post já curtido' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  async like(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<void> {
    await this.postsService.likePost(id, user.id);
  }

  @Delete(':id/likes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover curtida de um post' })
  @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' })
  @ApiNotFoundResponse({ description: 'Post ou curtida não encontrado' })
  async unlike(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<void> {
    await this.postsService.unlikePost(id, user.id);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Comentar em um post' })
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  createComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<CommentResponseDto> {
    return this.postsService.createComment(id, user.id, dto);
  }
}
