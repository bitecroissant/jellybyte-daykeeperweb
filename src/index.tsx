import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './stylesheets/reset.css'
import EventDatePage from './pages/EventDatePage.tsx'
import { SignInPage } from './pages/SignInPage.tsx'

const router = createBrowserRouter([
  { 
    path: '/',
    children: [
      {
        path: '/sign_in',
        element: <SignInPage />,
      },
      {
        path: '/1',
        element: <EventDatePage />,
      },
    ]
  },
])

const div = document.getElementById('root')

const root = createRoot(div!)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
