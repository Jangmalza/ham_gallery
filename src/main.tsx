import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AdminPage from './pages/AdminPage.tsx'
import AdminGuard from './pages/AdminGuard.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/admin', element: (
    <AdminGuard>
      <AdminPage />
    </AdminGuard>
  ) },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
