import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About TourProof</h1>
            <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              <p className="mb-6">
                TourProof is revolutionizing the travel industry by combining the security of blockchain
                technology with a user-friendly booking and review platform. Our mission is to create a
                transparent ecosystem where travelers can trust reviews and businesses can showcase their
                authentic customer experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How Blockchain Verification Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3 text-center">Verified Bookings</h3>
                <p className="text-gray-600 text-center">
                  Every booking made through TourProof is recorded on the blockchain, creating an immutable record of your stay or experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3 text-center">Authentic Reviews</h3>
                <p className="text-gray-600 text-center">
                  Only users who have completed a verified booking can leave reviews, ensuring all feedback is from genuine experiences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3 text-center">Token Rewards</h3>
                <p className="text-gray-600 text-center">
                  Users earn TourProof tokens for submitting verified reviews, which can be used for discounts on future bookings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 mx-auto overflow-hidden">
                  <img src="/api/placeholder/128/128" alt="Team member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Alex Johnson</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 mx-auto overflow-hidden">
                  <img src="/api/placeholder/128/128" alt="Team member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Sophia Chen</h3>
                <p className="text-gray-600">CTO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 mx-auto overflow-hidden">
                  <img src="/api/placeholder/128/128" alt="Team member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Michael Rivera</h3>
                <p className="text-gray-600">Head of Product</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">How does TourProof verify reviews?</h3>
                <p className="text-gray-600">
                  TourProof verifies reviews by linking them to actual bookings made through our platform. 
                  When you complete a stay or experience, you'll be eligible to leave a review. This review 
                  is then hashed and stored on the blockchain, creating an immutable record that proves you 
                  actually experienced the service you're reviewing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">What are TourProof tokens?</h3>
                <p className="text-gray-600">
                  TourProof tokens are rewards you earn for contributing verified reviews to our platform. 
                  These tokens can be used for discounts on future bookings, unlocking premium features, or 
                  exchanged with partner businesses for special offers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Do I need a cryptocurrency wallet to use TourProof?</h3>
                <p className="text-gray-600">
                  While connecting a wallet like MetaMask enhances your experience by giving you full control 
                  over your tokens and verification, it's not required. You can use TourProof with traditional 
                  authentication methods and we'll manage your blockchain interactions in the background.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">How is my data protected?</h3>
                <p className="text-gray-600">
                  TourProof is committed to data security and privacy. We encrypt sensitive information and 
                  follow GDPR compliance for user data. While booking and review verification data is stored 
                  on the blockchain for transparency, personal identifying information is kept secure in our 
                  encrypted database.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;