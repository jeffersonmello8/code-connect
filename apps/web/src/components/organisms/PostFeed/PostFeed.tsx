import { useCallback, useEffect, useState } from 'react'
import { FilterChips } from '../../molecules/FilterChips/FilterChips'
import { PostCard } from '../../molecules/PostCard/PostCard'
import { SearchBar } from '../../molecules/SearchBar/SearchBar'
import { useAuth } from '../../../contexts/AuthContext'
import { getApiErrorMessage } from '../../../lib/api/getApiErrorMessage'
import {
  likePost,
  listPosts,
  unlikePost,
} from '../../../lib/api/postsApi'
import type { PostResponse, PostSort } from '../../../lib/api/postTypes'
import { cn } from '../../../lib/cn'

export function PostFeed() {
  const { isAuthenticated } = useAuth()
  const [searchInput, setSearchInput] = useState('')
  const [terms, setTerms] = useState<string[]>([])
  const [sort, setSort] = useState<PostSort>('recent')
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await listPosts({
        q: terms.join(' '),
        sort,
      })
      setPosts(response.data)
    } catch (loadError) {
      setError(getApiErrorMessage(loadError))
    } finally {
      setLoading(false)
    }
  }, [sort, terms])

  useEffect(() => {
    void loadPosts()
  }, [loadPosts])

  function handleSearchSubmit() {
    const term = searchInput.trim()
    if (!term || terms.includes(term)) {
      return
    }

    setTerms((current) => [...current, term])
    setSearchInput('')
  }

  async function handleLike(postId: string) {
    if (!isAuthenticated) {
      return
    }

    const post = posts.find((item) => item.id === postId)
    if (!post) {
      return
    }

    try {
      if (post.likedByMe) {
        await unlikePost(postId)
      } else {
        await likePost(postId)
      }

      await loadPosts()
    } catch (likeError) {
      setError(getApiErrorMessage(likeError))
    }
  }

  async function handleShare(postId: string) {
    const url = `${window.location.origin}/posts/${postId}`
    await navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearchSubmit}
        />
        <FilterChips
          terms={terms}
          onRemove={(term) =>
            setTerms((current) => current.filter((item) => item !== term))
          }
          onClear={() => setTerms([])}
        />
      </div>

      <div className="flex gap-6 border-b border-cinza-escuro text-xl">
        {(['recent', 'popular'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSort(option)}
            className={cn(
              'px-1 pb-2',
              sort === option
                ? 'font-semibold text-verde-destaque underline decoration-verde-destaque underline-offset-4'
                : 'text-cinza-medio',
            )}
          >
            {option === 'recent' ? 'Recentes' : 'Populares'}
          </button>
        ))}
      </div>

      {error ? <p className="text-error">{error}</p> : null}
      {loading ? <p className="text-cinza-medio">Carregando posts...</p> : null}

      {!loading && posts.length === 0 ? (
        <p className="text-cinza-medio">Nenhum post encontrado.</p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isAuthenticated={isAuthenticated}
            onLike={(postId) => void handleLike(postId)}
            onShare={(postId) => void handleShare(postId)}
          />
        ))}
      </div>
    </div>
  )
}
