// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    listingId: 1,
    userId: 1,
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    guests: 2,
    totalPrice: 1200,
    status: 'confirmed',
    paymentMethod: 'credit_card',
    createdAt: '2024-05-15'
  }
];

export const bookingsService = {
  createBooking: async (bookingData) => {
    const newBooking = {
      id: mockBookings.length + 1,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockBookings.push(newBooking);
    return Promise.resolve({ data: newBooking });
  },
  
  getBookingById: async (id) => {
    const booking = mockBookings.find(b => b.id === parseInt(id));
    if (!booking) throw new Error('Booking not found');
    return Promise.resolve({ data: booking });
  },
  
  getUserBookings: async (params) => {
    return Promise.resolve({ data: mockBookings.filter(b => b.userId === 1) });
  },
  
  cancelBooking: async (id) => {
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) throw new Error('Booking not found');
    mockBookings[index].status = 'cancelled';
    return Promise.resolve({ data: mockBookings[index] });
  },
  
  getBookingReceipt: async (id) => {
    const booking = mockBookings.find(b => b.id === parseInt(id));
    if (!booking) throw new Error('Booking not found');
    return Promise.resolve({ data: { ...booking, receiptUrl: 'https://example.com/receipt.pdf' } });
  },
  
  updateBooking: async (id, updateData) => {
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) throw new Error('Booking not found');
    mockBookings[index] = { ...mockBookings[index], ...updateData };
    return Promise.resolve({ data: mockBookings[index] });
  },
  
  getReviewEligibility: async (bookingId) => {
    const booking = mockBookings.find(b => b.id === parseInt(bookingId));
    if (!booking) throw new Error('Booking not found');
    return Promise.resolve({ data: { eligible: true } });
  }
};