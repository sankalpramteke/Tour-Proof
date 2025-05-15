// Mock user data
const mockUser = {
  id: 1,
  email: 'user@example.com',
  name: 'John Doe',
  walletAddress: '0x123...abc',
  isEmailVerified: true
};

// Mock token
const mockToken = 'mock-jwt-token';

export const authService = {
  login: async (email, password) => {
    // Simple validation
    if (email && password) {
      return Promise.resolve({ data: { user: mockUser, token: mockToken } });
    }
    throw new Error('Invalid credentials');
  },
  
  signup: async (userData) => {
    if (userData.email && userData.password) {
      const newUser = { ...mockUser, ...userData };
      return Promise.resolve({ data: { user: newUser, token: mockToken } });
    }
    throw new Error('Invalid user data');
  },
  
  getCurrentUser: async () => {
    return Promise.resolve({ data: mockUser });
  },
  
  updateProfile: async (userData) => {
    const updatedUser = { ...mockUser, ...userData };
    return Promise.resolve({ data: updatedUser });
  },
  
  connectWallet: async (walletAddress, signature) => {
    if (walletAddress && signature) {
      const updatedUser = { ...mockUser, walletAddress };
      return Promise.resolve({ data: updatedUser });
    }
    throw new Error('Invalid wallet connection');
  },
  
  forgotPassword: async (email) => {
    if (email) {
      return Promise.resolve({ data: { message: 'Password reset email sent' } });
    }
    throw new Error('Email is required');
  },
  
  resetPassword: async (token, newPassword) => {
    if (token && newPassword) {
      return Promise.resolve({ data: { message: 'Password reset successful' } });
    }
    throw new Error('Invalid password reset');
  },
  
  verifyEmail: async (token) => {
    if (token) {
      return Promise.resolve({ data: { message: 'Email verified successfully' } });
    }
    throw new Error('Invalid verification token');
  }
};