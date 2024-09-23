'use client';  // Make sure to add 'use client' to specify this is a Client Component

import { useRouter } from 'next/navigation';  // Use next/navigation instead of next/router

export default function WelcomeScreen() {
  const router = useRouter();  // Now use useRouter from next/navigation

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to House of Virasat</h1>
      <button onClick={() => router.push('/login')} className="button">
        Login
      </button>
      <button onClick={() => router.push('/signup')} className="button">
        Create Account
      </button>
    </div>
  );
}

// Style for the overall container
const containerStyle = {
  textAlign: 'center',
  marginTop: '100px',
  backgroundColor: '#f7f9fc',  // Light grey-blue background
  padding: '40px',
  borderRadius: '10px',
  width: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Style for the title
const titleStyle = {
  color: '#2c3e50',  // Dark grey for the title
  fontSize: '2.5rem',
  marginBottom: '40px',
};
