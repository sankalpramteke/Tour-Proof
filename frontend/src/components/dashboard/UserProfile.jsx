import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import LoadingSpinner from '../common/LoadingSpinner';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profileImage: '',
    walletAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { updateUserProfile } = useAuth();
  const { walletAddress } = useWallet();

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        profileImage: user.profileImage || '',
        walletAddress: walletAddress || user.walletAddress || ''
      });
    }
  }, [user, walletAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await updateUserProfile(profileData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My Profile</h3>
        <Button 
          variant={isEditing ? 'outline-primary' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                />
                <Form.Text className="text-muted">
                  Email cannot be changed
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Profile Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="profileImage"
                  value={profileData.profileImage}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                  type="text"
                  name="walletAddress"
                  value={profileData.walletAddress}
                  disabled
                  className="bg-light"
                />
                <Form.Text className="text-muted">
                  Connect wallet to update
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          
          <div className="mt-4">
            <Button 
              type="submit" 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      ) : (
        <Row className="g-4">
          <Col md={6}>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Username</h6>
              <p className="mb-0">{user.username || 'Not set'}</p>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Email</h6>
              <p className="mb-0">{user.email}</p>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Member Since</h6>
              <p className="mb-0">
                {user.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString() 
                  : 'Unknown'}
              </p>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="mb-3">
              <h6 className="text-muted mb-1">Wallet Address</h6>
              <code className="d-block text-break">
                {walletAddress || user.walletAddress || 'Not connected'}
              </code>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserProfile;