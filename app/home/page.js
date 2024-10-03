
'use client';  
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [cart, setCart] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showCart, setShowCart] = useState(false); // Cart modal visibility

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
      setFilteredProducts(productsArray);  // Set initial filtered products
    };

    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  // Handle sorting
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (sortOption === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  // Add to cart functionality
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Remove from cart functionality
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div style={containerStyle}>
      {/* Small Cart Icon in Top Right */}
      <div style={cartIconContainerStyle}>
        <span style={cartItemCountStyle}>{cart.length}</span>
        <span role="img" aria-label="cart" style={cartIconStyle}>🛒</span>
      </div>

      {/* Search and Sort Section */}
      <div style={searchSortSectionStyle}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBarStyle}
        />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={selectStyle}>
          <option value="">Sort by</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="name-asc">Name (A to Z)</option>
        </select>
      </div>

      {/* Price Filter */}
      <div style={priceFilterStyle}>
        <label style={labelStyle}>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          style={priceInputStyle}
        />
        <label style={labelStyle}>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={priceInputStyle}
        />
      </div>

      {/* Product Grid */}
      <h2 style={sectionTitleStyle}>New Arrivals</h2>
      <div style={productGridStyle}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <img src={product.imageUrl} alt={product.name} style={imageStyle} /> {/* Display Image */}
            <h3 style={productTitleStyle}>{product.name}</h3>
            <p style={descriptionStyle}>{product.description}</p>
            <p style={priceStyle}>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)} style={buttonStyle}>Add to Cart</button>
          </div>
        ))}
      </div>


      {/* Cart Button */}
      <div style={cartIconStyle} onClick={() => setShowCart(!showCart)}>
        <span role="img" aria-label="cart">🛒</span> {cart.length} items
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div style={cartModalStyle}>
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={cartItemStyle}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '50px' }} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <button onClick={() => removeFromCart(index)} style={removeButtonStyle}>Remove</button>
              </div>
            ))
          )}
          <button onClick={() => setShowCart(false)} style={buttonStyle}>Close Cart</button>
        </div>
      )}
    </div>
  );
}

// Styling for the components
const containerStyle = {
  fontFamily: "'Roboto', sans-serif",
  backgroundColor: '#f7f9fc',
  color: '#333',
  padding: '10px' , 
  textAlign: 'center',
  minHeight: '100vh',
  position: 'relative',
};

const cartIconContainerStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  alignItems: 'center',
};

const cartIconStyle = {
  fontSize: '28px',
  cursor: 'pointer',
  color: '#333',
};

const cartItemCountStyle = {
  fontSize: '12px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  borderRadius: '50%',
  padding: '5px 10px',
  position: 'absolute',
  top: '-10px',
  right: '-10px',
};

const searchSortSectionStyle = {
  margin: '40px 0',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const searchBarStyle = {
  padding: '15px',
  fontSize: '16px',
  width: '40%',
  borderRadius: '30px',
  border: '1px solid #bdc3c7',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const selectStyle = {
  padding: '12px',
  borderRadius: '30px',
  border: '1px solid #bdc3c7',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const priceFilterStyle = {
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const labelStyle = {
  fontSize: '16px',
  color: '#333',
};

const priceInputStyle = {
  padding: '10px',
  width: '80px',
  borderRadius: '30px',
  border: '1px solid #bdc3c7',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const sectionTitleStyle = {
  fontSize: '2rem',
  marginBottom: '20px',
  color: '#34495e',
};

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  padding: '0 20px',
};

const productCardStyle = {
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
};

const productTitleStyle = {
  fontSize: '1.2rem',
  color: '#2c3e50',
  marginTop: '10px',
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#7f8c8d',
  margin: '10px 0',
};

const priceStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#e74c3c',
};

const buttonStyle = {
  padding: '12px 25px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const footerStyle = {
  backgroundColor: '#2c3e50',
  padding: '20px',
  textAlign: 'center',
  marginTop: '40px',
};

const footerTextStyle = {
  color: '#fff',
  fontSize: '0.9rem',
  cursor: 'pointer',
};

const cartModalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const removeButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};
