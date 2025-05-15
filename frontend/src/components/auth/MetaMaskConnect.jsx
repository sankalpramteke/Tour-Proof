import React, { useState } from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { useWallet } from '../../hooks/useWallet';
import LoadingSpinner from '../common/LoadingSpinner';

const MetaMaskConnect = () => {
  const { isConnecting, walletConnected, connectWallet, walletAddress, walletBalance } = useWallet();
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setError(null);
    try {
      await connectWallet();
    } catch (err) {
      setError(err.message || 'Failed to connect wallet. Please try again.');
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Connect Your Wallet</Card.Title>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}
        
        {walletConnected ? (
          <div>
            <Row className="mb-3">
              <Col>
                <small className="text-muted">Connected Wallet</small>
                <div className="fw-medium">{formatAddress(walletAddress)}</div>
              </Col>
              <Col>
                <small className="text-muted">Balance</small>
                <div className="fw-medium">{walletBalance} TOUR</div>
              </Col>
            </Row>
            
            <Alert variant="success" className="d-flex align-items-center">
              <svg className="bi flex-shrink-0 me-2" width="16" height="16" fill="currentColor">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <div>
                Wallet connected successfully. You can now earn and use TOUR tokens for your verified reviews.
              </div>
            </Alert>
          </div>
        ) : (
          <div>
            <p className="text-muted mb-4">
              Connect your MetaMask wallet to earn TOUR tokens for verified reviews and unlock additional features.
            </p>
            
            <div className="d-grid">
              <Button
                variant="primary"
                onClick={handleConnect}
                disabled={isConnecting}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="bi" width="16" height="16" fill="currentColor">
                      <path d="M4 4a2 2 0 0 0-2 2v1h16V6a2 2 0 0 0-2-2H4z"/>
                      <path d="M18 9H2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM4 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm5-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H9z"/>
                    </svg>
                    <span>Connect MetaMask</span>
                  </>
                )}
              </Button>
            </div>
            
            {!window.ethereum && (
              <Alert variant="warning" className="mt-4 d-flex align-items-center">
                <svg className="bi flex-shrink-0 me-2" width="16" height="16" fill="currentColor">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div>
                  MetaMask not detected. Please install the MetaMask extension to continue.
                </div>
              </Alert>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MetaMaskConnect;