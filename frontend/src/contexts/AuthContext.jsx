import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/auth.service';
import axios from 'axios';

export const AuthContext = createContext();

// Context is consumed through the useAuth hook in hooks/useAuth.js

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      console.log('Starting Google login process...', response);
      console.log('Fetching user info with token:', response.access_token);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${response.access_token}` }
        }
      );
      console.log('Received user info:', userInfo.data);

      const userData = {
        email: userInfo.data.email,
        name: userInfo.data.name,
        picture: userInfo.data.picture,
        googleId: userInfo.data.sub,
        accessToken: response.access_token
      };

      console.log('Setting user data:', userData);
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
    setError('Google authentication failed');
    setLoading(false);
  };

  useEffect(() => {
    // Check if user is already logged in (token in localStorage)
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(userData);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    handleGoogleSuccess,
    handleGoogleError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};