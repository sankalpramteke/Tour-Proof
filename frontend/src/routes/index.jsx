import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Pages
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import AuthPage from '../pages/AuthPage';
import NotFoundPage from '../pages/NotFoundPage';
import Profile from '../pages/Profile';
import MyBookings from '../pages/MyBookings';
import DashboardPage from '../pages/DashboardPage';
import BookingPage from '../pages/BookingPage';
import ListingDetailPage from '../pages/ListingDetailPage';
import ReviewPage from '../pages/ReviewPage';

const AppRoutes = () => {
  console.log('Rendering Routes component');
  return (
    <RouterRoutes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          console.log('Rendering Profile route') || 
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
    </RouterRoutes>
  );
};

export default AppRoutes;
