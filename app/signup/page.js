'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';  
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';  
import { doc, setDoc } from 'firebase/firestore';  


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information (like name) in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
        uid: user.uid,  // Save the user's UID
      });

      console.log('Account created and saved in Firestore:', user);

      // Navigate to the home screen after successful account creation
      router.push('/home');
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      setError(error.message); // Display error message to the user
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Account</h2>
      <form onSubmit={handleSignUp} style={formStyle}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        /><br />
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
        <button type="submit" style={buttonStyle}>Create Account</button>
      </form>
      {error && <p style={errorStyle}>{error}</p>} {/* Display error if any */}
    </div>
  );
}

const containerStyle = {
  textAlign: 'center',
  marginTop: '50px',
  backgroundColor: '#f7f9fc', 
  padding: '40px',
  borderRadius: '10px',
  width: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  color: '#2c3e50',  
  fontSize: '2rem',
  marginBottom: '20px',
};

const formStyle = {
  textAlign: 'center',
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  fontSize: '1.2rem',
  width: '80%',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',  
  backgroundColor: '#ecf0f1',  
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1.2rem',
  backgroundColor: '#27ae60',  
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};

