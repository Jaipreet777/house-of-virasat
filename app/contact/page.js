'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !message) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      // Add contact form details to Firestore
      await addDoc(collection(db, 'contacts'), {
        name: name,
        email: email,
        phone: phone,
        message: message,
        createdAt: new Date(),
      });

      // Clear form and show success message
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSuccess('Your message has been sent successfully!');
      setError('');
    } catch (err) {
      console.error('Error sending message: ', err);
      setError('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Contact Us</h2>
      {success && <p style={successStyle}>{success}</p>}
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Your Phone (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>

      <h3>Follow Us</h3>
      <div style={socialMediaContainer}>
        <a href="https://www.facebook.com/your-shop" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
          <img src="/facebook-icon.png" alt="Facebook" style={iconStyle} /> Facebook
        </a>
        <a href="https://www.instagram.com/your-shop" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
          <img src="/instagram-icon.png" alt="Instagram" style={iconStyle} /> Instagram
        </a>
        <a href="https://www.twitter.com/your-shop" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
          <img src="/twitter-icon.png" alt="Twitter" style={iconStyle} /> Twitter
        </a>
        <a href="https://www.linkedin.com/your-shop" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
          <img src="/linkedin-icon.png" alt="LinkedIn" style={iconStyle} /> LinkedIn
        </a>
      </div>
    </div>
  );
}

// Styles for the form and social media buttons
const formContainerStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
};

const textareaStyle = {
  padding: '10px',
  margin: '10px 0',
  width: '300px',
  height: '100px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
};

const successStyle = {
  color: 'green',
  marginBottom: '10px',
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const socialMediaContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const socialButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  margin: '10px',
  textDecoration: 'none',
  color: 'white',
  backgroundColor: '#0077b5',  // LinkedIn blue
  borderRadius: '5px',
  cursor: 'pointer',
};

const iconStyle = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
};
