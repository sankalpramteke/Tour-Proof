import { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null,
    balance: null,
    network: null,
    chainId: null,
    web3: null,
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
      const web3 = new Web3(window.ethereum);
      const chainId = await web3.eth.getChainId();
      const balance = await web3.eth.getBalance(address);

      // Get network name based on chain ID
      let networkName = 'Unknown';
      switch (chainId) {
        case 1:
          networkName = 'Ethereum Mainnet';
          break;
        case 5:
          networkName = 'Goerli Testnet';
          break;
        case 11155111:
          networkName = 'Sepolia Testnet';
          break;
        case 137:
          networkName = 'Polygon Mainnet';
          break;
        case 80001:
          networkName = 'Mumbai Testnet';
          break;
        default:
          networkName = `Chain ${chainId}`;
      }

      setWallet({
        address,
        balance: web3.utils.fromWei(balance, 'ether'),
        network: networkName,
        chainId,
        web3,
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
      chainId: null,
      web3: null,
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