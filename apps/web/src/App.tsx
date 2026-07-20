import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { GuestRoute } from './components/routes/GuestRoute'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
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
