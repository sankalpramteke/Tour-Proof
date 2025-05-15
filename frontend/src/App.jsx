import React from 'react'
import Routes from './routes'
import Navbar from './components/common/Navbar'
import { WalletProvider } from './contexts/WalletContext'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import custom styles
import './App.css'
import './assets/styles/main.scss'

function App() {
  return (
    <WalletProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes />
        </main>
      </div>
    </WalletProvider>
  )
}

export default App;