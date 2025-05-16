import React, { useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import './Navbar.css';

const MetaMaskConnect = ({ className }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }

    return undefined;
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this feature');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className={`${className} primary-button`}
      disabled={isConnecting}
      type="button"
    >
      <span className="button-content">
        {isConnecting
          ? 'Connecting...'
          : account
          ? formatAddress(account)
          : 'Connect Wallet'}
        <BsArrowRight className="button-arrow" />
      </span>
    </button>
  );
};

export default MetaMaskConnect;
