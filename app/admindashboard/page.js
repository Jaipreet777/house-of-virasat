'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState(''); // Tracks which section of the dashboard is being viewed
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editProductId, setEditProductId] = useState(null); // Track product being edited

  // Load Appointments and Products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
        const productsSnapshot = await getDocs(collection(db, 'products'));

        setAppointments(appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Adding or Editing Products
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProductId) {
        // Update existing product
        const productRef = doc(db, 'products', editProductId);
        await updateDoc(productRef, { name, price, description, imageUrl });
        setEditProductId(null);
      } else {
        // Add a new product
        await addDoc(collection(db, 'products'), { name, price, description, imageUrl });
      }

      setName('');
      setPrice(0);
      setDescription('');
      setImageUrl('');
      alert(editProductId ? 'Product updated' : 'Product added');
    } catch (error) {
      console.error('Error adding/updating product: ', error);
    }
  };

  // Handle Deleting a Product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  // Populate form for editing
  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImageUrl(product.imageUrl);
  };

  // UI for Switching Between Views
  return (
    <div style={dashboardStyle}>
      <h2>Admin Dashboard</h2>

      {/* Dropdown to navigate between sections */}
      <div style={dropdownStyle}>
        <select onChange={(e) => setView(e.target.value)} value={view} style={selectStyle}>
          <option value="">Select an Action</option>
          <option value="addAppointment">Add Appointment</option>
          <option value="addProduct">Add Product</option>
          <option value="viewAppointments">View Appointments</option>
          <option value="viewProducts">View Products</option>
        </select>
      </div>

      {/* Conditionally Render Sections */}
      {loading ? <p>Loading...</p> : (
        <>
          {view === 'addAppointment' && <AddAppointment />}
          {view === 'addProduct' && (
            <form onSubmit={handleProductSubmit} style={formStyle}>
              <h3>{editProductId ? 'Edit Product' : 'Add Product'}</h3>
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
              <button type="submit" style={buttonStyle}>
                {editProductId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          )}

          {view === 'viewAppointments' && (
            <>
              <h3>Upcoming Appointments</h3>
              {appointments.length === 0 ? <p>No appointments</p> : (
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
                    {appointments.map(appointment => (
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
            </>
          )}

          {view === 'viewProducts' && (
            <>
              <h3>Manage Products</h3>
              {products.length === 0 ? <p>No products</p> : (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.description}</td>
                        <td>
                          <button onClick={() => handleEditProduct(product)} style={buttonStyle}>Edit</button>
                          <button onClick={() => handleDeleteProduct(product.id)} style={deleteButtonStyle}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// Add Appointment Form Component (You can move this to its own file)
function AddAppointment() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      setErrorMessage("Please fill in both date and time.");
      return;
    }

    try {
      await addDoc(collection(db, 'timeSlots'), { date, time });
      setSuccess('Time slot added successfully!');
      setDate('');
      setTime('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("Failed to add time slot.");
    }
  };

  return (
    <div>
      <h3>Add Available Time Slot</h3>
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

// Styles
const dashboardStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const dropdownStyle = {
  marginBottom: '20px',
};

const selectStyle = {
  padding: '10px',
  width: '200px',
  fontSize: '16px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '20px',
};

const inputStyle = {
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  padding: '10px',
  width: '300px',
  height: '100px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#e74c3c',
};

const tableStyle = {
  margin: '20px auto',
  borderCollapse: 'collapse',
  width: '80%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const successStyle = {
  color: 'green',
};

const errorStyle = {
  color: 'red',
};
