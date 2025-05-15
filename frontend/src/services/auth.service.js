import apiClient from './api';

export const authService = {
  login: async (email, password) => {
    return await apiClient.post('/auth/login', { email, password });
  },
  
  signup: async (userData) => {
    return await apiClient.post('/auth/signup', userData);
  },
  
  getCurrentUser: async () => {
    return await apiClient.get('/user/profile');
  },
  
  updateProfile: async (userData) => {
    return await apiClient.put('/user/profile', userData);
  },
  
  connectWallet: async (walletAddress, signature) => {
    return await apiClient.post('/auth/connect-wallet', { walletAddress, signature });
  },
  
  forgotPassword: async (email) => {
    return await apiClient.post('/auth/forgot-password', { email });
  },
  
  resetPassword: async (token, newPassword) => {
    return await apiClient.post('/auth/reset-password', { token, newPassword });
  },
  
  verifyEmail: async (token) => {
    return await apiClient.get(`/auth/verify-email/${token}`);
  }
};