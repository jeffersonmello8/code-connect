import { type ReactNode } from 'react'

import { AuthBanner } from '../../organisms/AuthBanner'

export interface AuthLayoutProps {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

const BRAND_MARK_WIDTH = 814
const BRAND_MARK_HEIGHT = 972

function WatermarkPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <img
        src="/brand-mark.webp"
        alt=""
        width={BRAND_MARK_WIDTH}
        height={BRAND_MARK_HEIGHT}
        decoding="async"
        className="absolute right-[8%] bottom-0 h-[486px] w-[407px] opacity-30"
      />
      <img
        src="/brand-mark.webp"
        alt=""
        width={BRAND_MARK_WIDTH}
        height={BRAND_MARK_HEIGHT}
        decoding="async"
        className="absolute left-[8%] top-0 h-[487px] w-[407px] opacity-30"
      />
    </div>
  )
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-svh items-center justify-center bg-grafite px-4 py-8">
      <WatermarkPattern />

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-4xl border border-grafite bg-cinza-escuro shadow-2xl">
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
