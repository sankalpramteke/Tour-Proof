import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'auth',
        element: <AuthPage />
      },
      {
        path: 'listings',
        element: <ListingsPage />
      },
      {
        path: 'listings/:id',
        element: <ListingDetailPage />
      },
      {
        path: 'booking/:listingId',
        element: <BookingPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'review/:bookingId',
        element: <ReviewPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      }
    ]
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;