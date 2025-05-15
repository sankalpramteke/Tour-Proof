import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsService } from '../../services/bookings.service';
import LoadingSpinner from '../common/LoadingSpinner';

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const data = await bookingsService.getUserBookings(userId);
        setBookings(data);
        setError(null);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const getFilteredBookings = () => {
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return bookings.filter(booking => new Date(booking.start_date) >= now && booking.status !== 'canceled');
    } else if (activeTab === 'past') {
      return bookings.filter(booking => new Date(booking.end_date) < now || booking.status === 'completed');
    } else if (activeTab === 'canceled') {
      return bookings.filter(booking => booking.status === 'canceled');
    }
    return bookings;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canLeaveReview = (booking) => {
    const now = new Date();
    return (
      booking.status === 'completed' || 
      (booking.status === 'confirmed' && new Date(booking.end_date) < now)
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'past' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'canceled' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('canceled')}
          >
            Canceled
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No {activeTab} bookings found.</p>
          {activeTab !== 'upcoming' && (
            <button
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => setActiveTab('upcoming')}
            >
              View upcoming bookings
            </button>
          )}
          {activeTab === 'upcoming' && (
            <div className="mt-4">
              <Link 
                to="/listings" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Explore listings
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div key={booking.booking_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.listing?.title || 'Listing'}</h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="inline-block mr-3">{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Guests:</span> {booking.number_of_guests}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Total:</span> ${booking.total_price}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  <Link 
                    to={`/listings/${booking.listing_id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View listing
                  </Link>
                  {canLeaveReview(booking) && (
                    <Link 
                      to={`/review/${booking.booking_id}`}
                      className="px-3 py-1 bg-blue-600 text-white text-center rounded-md text-sm hover:bg-blue-700"
                    >
                      Leave review
                    </Link>
                  )}
                  {booking.blockchain_receipt_hash && (
                    <button 
                      onClick={() => window.open(`https://etherscan.io/tx/${booking.blockchain_receipt_hash}`, '_blank')}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View receipt on blockchain
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;