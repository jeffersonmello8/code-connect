import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppLayout } from './components/templates/AppLayout/AppLayout'
import { GuestRoute } from './components/routes/GuestRoute'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { CreatePostPage } from './pages/CreatePostPage/CreatePostPage'
import { FeedPage } from './pages/FeedPage/FeedPage'
import { LoginPage } from './pages/LoginPage'
import { PostDetailPage } from './pages/PostDetailPage/PostDetailPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/posts/new" element={<CreatePostPage />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
