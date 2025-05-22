import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './styles/colors.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      onScriptLoadError={() => console.error('Google OAuth script failed to load')}
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);