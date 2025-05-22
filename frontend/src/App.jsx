import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import { WalletProvider } from './contexts/WalletContext'
import { AuthProvider } from './contexts/AuthContext'

// Pages
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import ListingDetailPage from './pages/ListingDetailPage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import MyBookings from './pages/MyBookings'
import ProtectedRoute from './components/common/ProtectedRoute'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import custom styles
import './App.css'
import './assets/styles/main.scss'

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <BrowserRouter>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/listings/:id" element={<ListingDetailPage />} />
                <Route
                  path="/booking/:listingId"
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </WalletProvider>
    </AuthProvider>
  )
}

export default App;