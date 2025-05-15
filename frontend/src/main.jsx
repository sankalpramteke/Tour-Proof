import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { WalletProvider } from './contexts/WalletContext'

const router = createBrowserRouter([{ path: '*', element: <App /> }], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WalletProvider>
        <RouterProvider router={router} />
      </WalletProvider>
    </AuthProvider>
  </React.StrictMode>
);