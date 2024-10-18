'use client';

import { useState } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function MockPaymentForm() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');
  const [showSaveOption, setShowSaveOption] = useState(false);
  const [userId, setUserId] = useState('user123'); // Hardcoded user ID for now (replace with logged-in user ID)

  // Simulate card validation and save it if it's not already saved
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock card validation
    if (cardNumber.length === 16 && cvv.length === 3 && expiry) {
      // Check if the card is already saved in Firebase
      const isCardSaved = await checkIfCardExists(cardNumber);
      
      if (isCardSaved) {
        setMessage('Payment successful using saved card!');
      } else {
        setShowSaveOption(true); // Prompt to save the card if not already saved
      }
    } else {
      setMessage('Invalid card details, try again.');
    }
  };

  // Check if the card is already saved in Firebase for this user
  const checkIfCardExists = async (cardNumber) => {
    const q = query(collection(db, 'paymentMethods'), where('userId', '==', userId), where('cardNumber', '==', cardNumber));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Return true if card exists, false otherwise
  };

  // Save card details in Firebase
  const saveCardDetails = async () => {
    try {
      const cardDoc = doc(collection(db, 'paymentMethods'));
      await setDoc(cardDoc, {
        userId: userId,
        name: name,
        cardNumber: cardNumber,
        expiry: expiry,
        cvv: cvv,  // Ideally, you should never store CVV, this is for learning purposes
      });

      setMessage('Card saved and payment successful!');
      setShowSaveOption(false);
    } catch (error) {
      console.error('Error saving card:', error);
      setMessage('Error saving card.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Mock Payment Form</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Name on Card</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            required
            style={inputStyle}
          />
        </div>
        <div style={inputRowStyle}>
          <div style={inputGroupSmallStyle}>
            <label style={labelStyle}>Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupSmallStyle}>
            <label style={labelStyle}>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
              style={inputStyle}
            />
          </div>
        </div>
        <button type="submit" style={buttonStyle}>Pay</button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}

      {/* Option to save card */}
      {showSaveOption && (
        <div style={saveCardOptionStyle}>
          <p>Would you like to save this card for future payments?</p>
          <button onClick={saveCardDetails} style={buttonStyle}>Save Card</button>
        </div>
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const inputRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const inputGroupSmallStyle = {
  flex: '0 0 48%',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: '#27ae60',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '15px',
};

const messageStyle = {
  textAlign: 'center',
  marginTop: '15px',
  fontSize: '16px',
  color: '#333',
};

const saveCardOptionStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

// ref: https://stripe.com/en-ca?utm_campaign=579707004&utm_medium=cpc&utm_source=bing&utm_content=79714800181162&utm_term=stripe&utm_device=c&utm_placement=&sitelink=&network=o&adgroup=1275435134656686&location=124148&msclkid=f8037629d2781b32787611381c99ec76