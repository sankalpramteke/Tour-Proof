import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/dashboard/UserProfile';
import UserBookings from '../components/dashboard/UserBookings';
import UserReviews from '../components/dashboard/UserReviews';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, isLoading } = useAuth();
  const { walletBalance } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile user={user} />;
      case 'bookings':
        return <UserBookings userId={user?.id} />;
      case 'reviews':
        return <UserReviews userId={user?.id} />;
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-50 rounded-lg p-4">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
                {user?.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.username} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-500">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <h2 className="font-bold text-xl">{user?.username || 'User'}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              
              {walletBalance !== null && (
                <div className="mt-3 bg-blue-50 p-2 rounded-md">
                  <p className="text-sm font-medium">Token Balance</p>
                  <p className="text-blue-600 font-bold">{walletBalance} TPT</p>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    My Bookings
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'reviews' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    My Reviews
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;