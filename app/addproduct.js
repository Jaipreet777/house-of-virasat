'use client'; // Mark as a Client Component

import { useState } from 'react';
import { db } from '../../firebase'; // Firebase Firestore reference
import { collection, addDoc } from 'firebase/firestore';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the product to the 'products' collection in Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        name,
        price,
        description,
        imageUrl
      });
      console.log('Product added with ID: ', docRef.id);
      
      // Reset form after submission
      setName('');
      setPrice(0);
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={textareaStyle}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Product</button>
      </form>
    </div>
  );
}

// Styling for form elements
const inputStyle = {
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const textareaStyle = {
  padding: '10px',
  width: '300px',
  height: '100px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '1rem'
};
