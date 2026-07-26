import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { FormField } from '../../molecules/FormField/FormField'
import { Icon } from '../../atoms/Icon'
import { PostThumbnail } from '../../atoms/PostThumbnail/PostThumbnail'
import { Tag } from '../../atoms/Tag/Tag'
import { getApiErrorMessage } from '../../../lib/api/getApiErrorMessage'
import { createPost, uploadThumbnail } from '../../../lib/api/postsApi'

export function CreatePostForm() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [thumbnailName, setThumbnailName] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function addTag() {
    const tag = tagInput.trim()
    if (!tag || tags.includes(tag) || tags.length >= 10) {
      return
    }

    setTags((current) => [...current, tag])
    setTagInput('')
  }

  async function handleFileChange(file: File | undefined) {
    if (!file) {
      return
    }

    setUploading(true)
    setError(null)

    try {
      const url = await uploadThumbnail(file)
      setThumbnailUrl(url)
      setThumbnailName(file.name)
    } catch (uploadError) {
      setError(getApiErrorMessage(uploadError))
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError('Preencha nome e descrição do projeto.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const post = await createPost({
        title: title.trim(),
        description: description.trim(),
        tags,
        thumbnailUrl: thumbnailUrl ?? undefined,
      })
      navigate(`/posts/${post.id}`)
    } catch (submitError) {
      setError(getApiErrorMessage(submitError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg bg-cinza-escuro p-8">
      <div className="grid gap-10 lg:grid-cols-[486px_1fr]">
        <div className="space-y-4">
          <div className="rounded-lg bg-cinza-medio p-6">
            <PostThumbnail
              src={thumbnailUrl}
              alt="Pré-visualização do projeto"
              variant="detail"
              className="rounded-lg shadow-[0_16px_24px_rgba(0,0,0,0.24)]"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleFileChange(event.target.files?.[0])}
          />

          <Button
            type="button"
            variant="secondary"
            className="w-full border-cinza-medio text-lg text-cinza-medio"
            loading={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            Carregar imagem
            <Icon name="upload" className="size-5" />
          </Button>

          {thumbnailName ? (
            <div className="flex items-center gap-2 text-sm text-cinza-medio">
              <span>{thumbnailName}</span>
              <button
                type="button"
                aria-label="Remover imagem"
                onClick={() => {
                  setThumbnailUrl(null)
                  setThumbnailName(null)
                }}
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="space-y-10">
          <h1 className="text-3xl font-semibold text-offwhite">Novo projeto</h1>

          <div className="space-y-6">
            <FormField
              id="project-title"
              label="Nome do projeto"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <div className="space-y-2">
              <label htmlFor="project-description" className="text-lg text-offwhite">
                Descrição
              </label>
              <textarea
                id="project-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-40 w-full rounded border border-transparent bg-cinza-medio px-4 py-2 text-sm text-cinza-escuro"
              />
            </div>

            <div className="space-y-4">
              <FormField
                id="project-tags"
                label="Tags"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addTag()
                  }
                }}
              />

              <div className="flex flex-wrap gap-4">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    onRemove={() =>
                      setTags((current) => current.filter((item) => item !== tag))
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {error ? <p className="text-error">{error}</p> : null}

          <div className="flex gap-6">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 border-verde-destaque text-verde-destaque"
              onClick={() => navigate('/')}
            >
              Descartar
              <Icon name="delete" className="size-5" />
            </Button>
            <Button
              type="button"
              className="flex-1"
              loading={submitting}
              onClick={() => void handleSubmit()}
            >
              Publicar
              <Icon name="publish" className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
