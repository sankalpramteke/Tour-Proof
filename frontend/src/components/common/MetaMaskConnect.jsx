import React, { useState, useEffect } from 'react';
import { Button, Image, Dropdown } from 'react-bootstrap';
import Web3 from 'web3';

const MetaMaskConnect = () => {
  const [wallet, setWallet] = useState({
    address: null,
    balance: null,
    network: null,
    connected: false
  });
  const [loading, setLoading] = useState(false);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          updateWalletInfo(accounts[0]);
        } else {
          handleDisconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        // Reload page on chain change as recommended by MetaMask
        window.location.reload();
      });

      // Check if already connected
      const checkConnection = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            await updateWalletInfo(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      };

      checkConnection();
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
      const balance = await web3.eth.getBalance(address);
      const chainId = await web3.eth.getChainId();

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
        connected: true
      });
    } catch (error) {
      console.error('Error updating wallet info:', error);
      handleDisconnect();
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const web3 = new Web3(window.ethereum);
      const address = accounts[0];
      const balance = await web3.eth.getBalance(address);
      const chainId = await web3.eth.getChainId();

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
        connected: true
      });
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWallet({
      address: null,
      balance: null,
      network: null,
      connected: false
    });
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.connected) {
    return (
      <Dropdown align="end">
        <Dropdown.Toggle variant="link" className="nav-link d-flex align-items-center gap-2 text-decoration-none">
          <Image
            src={`https://avatars.dicebear.com/api/jdenticon/${wallet.address}.svg`}
            width="32"
            height="32"
            roundedCircle
          />
          <span className="text-muted">{formatAddress(wallet.address)}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item disabled>
            <i className="bi bi-wallet2 me-2"></i>
            {wallet.network}
          </Dropdown.Item>
          <Dropdown.Item disabled>
            <i className="bi bi-coin me-2"></i>
            {parseFloat(wallet.balance).toFixed(4)} ETH
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleDisconnect} className="text-warning">
            <i className="bi bi-box-arrow-right me-2"></i>
            Disconnect
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      variant="outline-primary"
      className="d-flex align-items-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <i className="bi bi-wallet2"></i>
          <span>Connect MetaMask</span>
        </>
      )}
    </Button>
  );
};

export default MetaMaskConnect;
