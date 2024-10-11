'use client';  // Ensure this is a Client Component

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';  // Import useRouter for navigation
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

  const router = useRouter();  // Initialize useRouter for navigation

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

  // Navigate to product detail screen
  const goToProductDetail = (productId) => {
    router.push(`/productDetail?id=${productId}`);  // Navigate to Product Detail screen with productId as a query param
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>House of Virasat</h2>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchBarStyle}
      />

      {/* Sort options */}
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={selectStyle}>
        <option value="">Sort by</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="name-asc">Name (A to Z)</option>
      </select>

      {/* Filter by Price Range */}
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
      <div style={productGridStyle}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            style={productCardStyle} 
            onClick={() => goToProductDetail(product.id)}  // Navigate to product detail when clicked
          >
            <img src={product.imageUrl} alt={product.name} style={imageStyle} /> {/* Display Image */}
            <h3 style={productTitleStyle}>{product.name}</h3>
            <p style={descriptionStyle}>{product.description}</p>
            <p style={priceStyle}>Price: ${product.price}</p>
            <button onClick={(e) => { 
              e.stopPropagation();  // Prevent parent onClick from triggering
              addToCart(product); 
            }} style={buttonStyle}>Add to Cart</button>
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
  textAlign: 'center',
  marginTop: '50px',
  backgroundColor: '#f7f9fc',
  padding: '20px',
};

const titleStyle = {
  color: '#2c3e50',
  fontSize: '2.5rem',
  marginBottom: '20px',
};

const searchBarStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '50%',
  margin: '20px 0',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
  backgroundColor: '#ecf0f1',
};

const selectStyle = {
  padding: '10px',
  marginLeft: '20px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
  backgroundColor: '#ecf0f1',
};

const priceFilterStyle = {
  margin: '20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const labelStyle = {
  marginRight: '10px',
  fontSize: '16px',
  color: '#34495e',
};

const priceInputStyle = {
  padding: '5px',
  margin: '0 10px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
  backgroundColor: '#ecf0f1',
};

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  padding: '20px',
};

const productCardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.3s',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  borderRadius: '10px',
};

const productTitleStyle = {
  marginTop: '10px',
  fontSize: '1.2rem',
  color: '#2c3e50',
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#7f8c8d',
  margin: '5px 0',
};

const priceStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#e74c3c',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const cartIconStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#f39c12',
  padding: '10px',
  borderRadius: '50%',
  fontSize: '18px',
  color: '#fff',
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
