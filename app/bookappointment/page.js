'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference
import Calendar from 'react-calendar';  // React Calendar
import 'react-calendar/dist/Calendar.css';  // Import calendar styles

export default function BookAppointment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  // Fetch available time slots and booked appointments from Firestore
  useEffect(() => {
    const fetchTimeSlotsAndAppointments = async () => {
      // Fetch available time slots
      const timeSlotsSnapshot = await getDocs(collection(db, 'timeSlots'));
      const timeSlots = [];
      timeSlotsSnapshot.forEach((doc) => {
        timeSlots.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTimeSlots(timeSlots);

      // Fetch booked appointments
      const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
      const appointments = [];
      appointmentsSnapshot.forEach((doc) => {
        appointments.push({ id: doc.id, ...doc.data() });
      });
      setBookedAppointments(appointments);
    };

    fetchTimeSlotsAndAppointments();
  }, []);

  // Filter available time slots for the selected date
  const getAvailableTimesForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];  // Format date as YYYY-MM-DD
    const bookedTimes = bookedAppointments
      .filter((appointment) => appointment.date === formattedDate)
      .map((appointment) => appointment.time);

    // Filter out booked time slots
    return availableTimeSlots
      .filter((slot) => slot.date === formattedDate && !bookedTimes.includes(slot.time));
  };

  // Handle form submission to book the appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add appointment details to Firestore
      await addDoc(collection(db, 'appointments'), {
        name: name,
        email: email,
        date: selectedDate.toISOString().split('T')[0],  // Store date in YYYY-MM-DD format
        time: selectedTime,
        message: message,
      });
      setSuccess('Appointment booked successfully!');
      setName('');
      setEmail('');
      setSelectedDate(new Date());
      setSelectedTime('');
      setMessage('');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  // Highlight dates on the calendar with available time slots
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const hasAvailableSlots = availableTimeSlots.some((slot) => slot.date === formattedDate);

    return hasAvailableSlots ? 'highlight' : '';  // Add 'highlight' class if slots are available
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

        {/* Calendar to select date */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}  // Highlight dates with available appointments
          minDate={new Date()}  // Disable past dates
        />

        {/* Select Available Time */}
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Time</option>
          {getAvailableTimesForDate(selectedDate).map((slot, index) => (
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

// Add CSS for highlighting dates
const calendarStyle = `
  .highlight {
    background: #f39c12;
    border-radius: 50%;
    color: white;
  }
`;

// Inject the calendar styles into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = calendarStyle;
  document.head.appendChild(style);
}
