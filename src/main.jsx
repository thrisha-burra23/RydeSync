import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter} from 'react-router'
import {RouterProvider} from 'react-router/dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/register",
    element:<SignUpPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)