import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null,
    balance: null,
    network: null,
    provider: null,
    signer: null,
    connected: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum && localStorage.getItem('walletConnected') === 'true') {
        connectWallet();
      }
    };

    checkWalletConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          updateWalletInfo(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const updateWalletInfo = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);

      setWallet({
        address,
        balance: ethers.utils.formatEther(balance),
        network: network.name,
        provider,
        signer,
        connected: true
      });

      localStorage.setItem('walletConnected', 'true');
    } catch (err) {
      console.error('Error updating wallet info:', err);
      setError('Failed to update wallet information');
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      await updateWalletInfo(accounts[0]);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      localStorage.removeItem('walletConnected');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      network: null,
      provider: null,
      signer: null,
      connected: false
    });
    localStorage.removeItem('walletConnected');
  };

  const value = {
    wallet,
    loading,
    error,
    connectWallet,
    disconnectWallet
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};