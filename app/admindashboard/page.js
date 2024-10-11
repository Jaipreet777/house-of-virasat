'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsArray = [];
        querySnapshot.forEach((doc) => {
          appointmentsArray.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(appointmentsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={dashboardStyle}>
      <h2>Admin Dashboard - View Appointments</h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.message || 'No message'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Styles
const dashboardStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

const tableStyle = {
  margin: '0 auto',
  borderCollapse: 'collapse',
  width: '80%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const thStyle = {
  backgroundColor: '#f39c12',
  color: '#fff',
  padding: '10px',
  border: '1px solid #ddd',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};
