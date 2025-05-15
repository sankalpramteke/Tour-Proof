import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import './assets/styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Outlet />
          </main>
          <Footer />
        </div>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;