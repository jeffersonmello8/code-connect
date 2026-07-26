import { useParams } from 'react-router-dom'
import { PostDetail } from '../../components/organisms/PostDetail/PostDetail'

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <p className="text-error">Post inválido.</p>
  }

  return <PostDetail postId={id} />
}
