import { BrandMark } from '../../atoms/BrandMark'

export interface AuthBannerProps {
  src: string
  alt: string
}

export function AuthBanner({ src, alt }: AuthBannerProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={src} alt={alt} className="h-full w-full object-cover" />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-6 py-8">
        <BrandMark className="h-8 w-8" />
        <span className="text-lg font-semibold tracking-wide text-text">
          code connect
        </span>
      </div>
    </div>
  )
}
