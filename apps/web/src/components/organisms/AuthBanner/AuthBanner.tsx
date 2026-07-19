export interface AuthBannerProps {
  src: string
  alt: string
}

const BANNER_WIDTH = 1024
const BANNER_HEIGHT = 683
const LOGO_WIDTH = 160
const LOGO_HEIGHT = 50

export function AuthBanner({ src, alt }: AuthBannerProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={BANNER_WIDTH}
        height={BANNER_HEIGHT}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center px-6 py-8">
        <img
          src="/logo-code-connect.webp"
          alt="code connect"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          decoding="async"
          className="h-10 w-auto"
        />
      </div>
    </div>
  )
}
