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
  backgroundColor: '#f7f9fc',  
  padding: '40px',
  borderRadius: '10px',
  width: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  color: '#2c3e50',  
  fontSize: '2.5rem',
  marginBottom: '40px',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '1.2rem',
  backgroundColor: '#27ae60', 
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#2ecc71',  
};
