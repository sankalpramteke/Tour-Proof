import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: response => {
      console.log('Google login success:', response);
      onSuccess(response);
    },
    onError: error => {
      console.error('Google login error:', error);
      onError(error);
    },
    flow: 'implicit'
  });

  return (
    <div className="w-100">
      <Button
        variant="dark"
        className="d-flex align-items-center gap-2 w-100 justify-content-center"
        onClick={() => login()}
        style={{
          backgroundColor: '#1A1A1A',
          border: '1px solid #333',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
          ':hover': {
            backgroundColor: '#2A2A2A',
            borderColor: '#C1FF72'
          }
        }}
      >
        <FaGoogle style={{ color: '#C1FF72', marginRight: '12px', fontSize: '18px' }} />
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
