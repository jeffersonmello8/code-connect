export interface PostAuthor {
  id: string
  name: string
  handle: string
}

export interface PostResponse {
  id: string
  title: string
  description: string
  code: string | null
  thumbnailUrl: string | null
  tags: string[]
  author: PostAuthor
  likesCount: number
  commentsCount: number
  likedByMe: boolean
  createdAt: string
}

export interface PostDetailResponse extends PostResponse {
  comments: CommentResponse[]
}

export interface CommentResponse {
  id: string
  body: string
  author: PostAuthor
  parentId: string | null
  createdAt: string
  replies: CommentResponse[]
}

export interface PaginatedPostsResponse {
  data: PostResponse[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface CreatePostPayload {
  title: string
  description: string
  tags: string[]
  thumbnailUrl?: string
  code?: string
}

export interface CreateCommentPayload {
  body: string
  parentId?: string
}

export interface UploadResponse {
  url: string
}

export type PostSort = 'recent' | 'popular'

export interface ListPostsParams {
  q?: string
  page?: number
  limit?: number
  sort?: PostSort
}
