import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../organisms/Sidebar/Sidebar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-grafite text-offwhite">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between">
        <Sidebar />
        <main className="w-full min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
