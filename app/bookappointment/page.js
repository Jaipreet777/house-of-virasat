'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function BookAppointment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add appointment details to Firestore
      await addDoc(collection(db, 'appointments'), {
        name: name,
        email: email,
        date: date,
        time: time,
        message: message
      });
      setSuccess('Appointment booked successfully!');
      setName('');
      setEmail('');
      setDate('');
      setTime('');
      setMessage('');
    } catch (error) {
      console.error("Error booking appointment: ", error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Book an Appointment</h2>
      {success && <p style={successStyle}>{success}</p>}
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
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Leave a message (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle}>Book Appointment</button>
      </form>
    </div>
  );
}

// Styles for the form
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
};
