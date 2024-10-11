'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function AdminAddTimeSlots() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Added for displaying any errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Check if the function is triggered
    console.log("Submitting form");

    if (!date || !time) {
      setErrorMessage("Please fill in both date and time.");
      return;
    }

    try {
      // Add available time slots to Firestore
      await addDoc(collection(db, 'timeSlots'), {
        date: date,
        time: time,
      });

      // Debugging: Check if the document was added successfully
      console.log("Time slot added to Firestore");

      setSuccess('Time slot added successfully!');
      setDate('');
      setTime('');
      setErrorMessage('');  // Clear any error messages on success
    } catch (error) {
      console.error("Error adding time slot: ", error);
      setErrorMessage("Failed to add time slot. Please try again.");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add Available Time Slot</h2>
      {success && <p style={successStyle}>{success}</p>}
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
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
        <button type="submit" style={buttonStyle}>Add Time Slot</button>
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

const errorStyle = {
  color: 'red',
};
