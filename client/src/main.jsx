import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Frame from './Frame.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/folder/:id/",
        element: <App />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
