'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function BookAppointment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch available time slots from Firestore
    const fetchTimeSlots = async () => {
      const querySnapshot = await getDocs(collection(db, 'timeSlots'));
      const timeSlots = [];
      querySnapshot.forEach((doc) => {
        timeSlots.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTimeSlots(timeSlots);
    };

    fetchTimeSlots();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add appointment details to Firestore
      await addDoc(collection(db, 'appointments'), {
        name: name,
        email: email,
        date: selectedDate,
        time: selectedTime,
        message: message
      });
      setSuccess('Appointment booked successfully!');
      setName('');
      setEmail('');
      setSelectedDate('');
      setSelectedTime('');
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

        {/* Select Available Date */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Date</option>
          {availableTimeSlots.map((slot, index) => (
            <option key={index} value={slot.date}>
              {slot.date}
            </option>
          ))}
        </select>

        {/* Select Available Time */}
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Time</option>
          {availableTimeSlots
            .filter((slot) => slot.date === selectedDate)
            .map((slot, index) => (
              <option key={index} value={slot.time}>
                {slot.time}
              </option>
            ))}
        </select>

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
