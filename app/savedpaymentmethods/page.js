'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function SavedPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('user123'); // Hardcoded user ID for now (replace with logged-in user ID)

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      const q = query(collection(db, 'paymentMethods'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const methods = querySnapshot.docs.map(doc => doc.data());
      setPaymentMethods(methods);
      setLoading(false);
    };

    fetchPaymentMethods();
  }, [userId]);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Saved Payment Methods</h2>

      {loading ? (
        <p>Loading...</p>
      ) : paymentMethods.length > 0 ? (
        <ul style={listStyle}>
          {paymentMethods.map((method, index) => (
            <li key={index} style={listItemStyle}>
              <p><strong>Name:</strong> {method.name}</p>
              <p><strong>Card Number:</strong> **** **** **** {method.cardNumber.slice(-4)}</p>
              <p><strong>Expiry:</strong> {method.expiry}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved payment methods found.</p>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

const listStyle = {
  listStyleType: 'none',
  paddingLeft: '0',
};

const listItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  marginBottom: '10px',
};
