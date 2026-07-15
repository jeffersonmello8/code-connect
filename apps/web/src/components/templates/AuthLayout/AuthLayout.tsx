import { type ReactNode } from 'react'
import { BrandMark } from '../../atoms/BrandMark'
import { AuthBanner } from '../../organisms/AuthBanner'

export interface AuthLayoutProps {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

function WatermarkPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="grid h-full w-full grid-cols-3 gap-12 p-8 opacity-[0.04] sm:grid-cols-4 md:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <BrandMark key={index} className="mx-auto h-20 w-20" />
        ))}
      </div>
    </div>
  )
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-svh items-center justify-center bg-surface px-4 py-8">
      <WatermarkPattern />

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl">
        <aside className="hidden min-h-[560px] w-1/2 lg:block">
          <AuthBanner src={bannerSrc} alt={bannerAlt} />
        </aside>

        <main className="flex w-full flex-1 items-center justify-center px-8 py-10 lg:w-1/2 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  )
}
