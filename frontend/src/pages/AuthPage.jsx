import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import MetaMaskConnect from '../components/auth/MetaMaskConnect';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const { connectWallet, wallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials.email, credentials.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };
  
  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };
  
  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      // Additional steps to link wallet to user account would go here
    } catch (err) {
      setError(err.message || 'Failed to connect wallet.');
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <div className="auth-form-container">
          {activeTab === 'login' ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <SignupForm onSubmit={handleSignup} />
          )}
        </div>
        
        <div className="auth-divider">
          <span>OR</span>
        </div>
        
        <div className="wallet-auth">
          <MetaMaskConnect 
            onConnect={handleWalletConnect} 
            isConnected={wallet.connected}
            walletAddress={wallet.address}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;