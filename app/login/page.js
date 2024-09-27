'use client';  

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';  
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      router.push('/home');  
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        /><br />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
}

// Style for the overall container
const containerStyle = {
  textAlign: 'center',
  marginTop: '100px',
  backgroundColor: '#f7f9fc', // Light grey-blue background
  padding: '40px',
  borderRadius: '10px',
  width: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Style for the title
const titleStyle = {
  color: '#2c3e50',  // Dark grey for title
  fontSize: '2rem',
  marginBottom: '20px',
};

// Style for the form
const formStyle = {
  textAlign: 'center',
};

// Style for the input fields
const inputStyle = {
  padding: '10px',
  margin: '10px',
  fontSize: '1.2rem',
  width: '80%',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',  // Light grey border
  backgroundColor: '#ecf0f1',  // Soft grey background
};

// Style for the button
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1.2rem',
  backgroundColor: '#27ae60',  // Green color for button
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#2ecc71',  // Slightly lighter green on hover
};

// ref: chatgpt - ' add similar styles as in signup screen'