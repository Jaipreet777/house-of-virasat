'use client';  // Use this to mark the file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use next/navigation for router
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';  // Import Firebase configuration, including Firestore
import { doc, setDoc } from 'firebase/firestore';  // Firestore methods to store user data

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information (like name) in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
        uid: user.uid,  // You can save the user's UID
      });

      console.log('Account created and saved in Firestore:', user);

      // Navigate to the home screen after successful account creation
      router.push('/home');
    } catch (error) {
      console.error('Error during sign-up:', error.message);
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
    </div>
  );
}

// Style for the overall container
const containerStyle = {
  textAlign: 'center',
  marginTop: '50px',
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
  backgroundColor: '#27ae60',  // Green color
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#2ecc71',  // Slightly lighter green on hover
};