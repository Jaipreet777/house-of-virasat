'use client';

import { useRouter } from 'next/navigation';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to House of Virasat</h1>
      <button onClick={() => router.push('/login')} style={buttonStyle}>
        Login
      </button>
      <button onClick={() => router.push('/signup')} style={buttonStyle}>
        Create Account
      </button>
    </div>
  );
}

const containerStyle = {
  textAlign: 'center',
  marginTop: '100px',
  padding: '60px 40px',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '1000px',
  margin: 'auto',
  fontFamily: "'Roboto', sans-serif",
};

const titleStyle = {
  color: '#2c3e50',
  fontSize: '3rem',
  marginBottom: '50px',
  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  padding: '15px 30px',
  margin: '10px',
  fontSize: '1.2rem',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '30px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '80%',
  maxWidth: '300px',
};

buttonStyle[':hover'] = {
  backgroundColor: '#2ecc71',
  transform: 'scale(1.05)',
};


