import { apiClient } from './apiClient'
import type {
  CreateCommentPayload,
  CreatePostPayload,
  ListPostsParams,
  PaginatedPostsResponse,
  PostDetailResponse,
  PostResponse,
  UploadResponse,
} from './postTypes'

function resolveAssetUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  const baseURL = apiClient.defaults.baseURL ?? 'http://localhost:3000'
  return `${baseURL.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`
}

function mapPost(post: PostResponse): PostResponse {
  return {
    ...post,
    thumbnailUrl: post.thumbnailUrl ? resolveAssetUrl(post.thumbnailUrl) : null,
  }
}

export async function listPosts(
  params: ListPostsParams = {},
): Promise<PaginatedPostsResponse> {
  const { data } = await apiClient.get<PaginatedPostsResponse>('/posts', {
    params,
  })

  return {
    ...data,
    data: data.data.map(mapPost),
  }
}

export async function getPost(id: string): Promise<PostDetailResponse> {
  const { data } = await apiClient.get<PostDetailResponse>(`/posts/${id}`)
  return mapPost(data) as PostDetailResponse
}

export async function createPost(
  payload: CreatePostPayload,
): Promise<PostResponse> {
  const { data } = await apiClient.post<PostResponse>('/posts', payload)
  return mapPost(data)
}

export async function likePost(id: string): Promise<void> {
  await apiClient.post(`/posts/${id}/likes`)
}

export async function unlikePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}/likes`)
}

export async function createComment(
  postId: string,
  payload: CreateCommentPayload,
): Promise<void> {
  await apiClient.post(`/posts/${postId}/comments`, payload)
}

export async function uploadThumbnail(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await apiClient.post<UploadResponse>('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return resolveAssetUrl(data.url)
}
