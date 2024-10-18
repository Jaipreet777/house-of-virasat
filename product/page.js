'use client';  // Ensure this is a Client Component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Use useSearchParams for query parameters
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference
import { useRouter } from 'next/navigation';  // For navigation to checkout

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);  // State for the cart
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');  // Get the productId from query parameters
  const router = useRouter();

  // Fetch product details using the productId
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const docRef = doc(db, 'products', productId);
          const productSnap = await getDoc(docRef);

          if (productSnap.exists()) {
            setProduct({ id: productId, ...productSnap.data() });
          } else {
            console.log('No such product!');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setLoading(false);  // Stop loading if there's no productId
    }
  }, [productId]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to Cart functionality
  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  // Buy Now functionality (add to cart and redirect to checkout)
  const buyNow = () => {
    addToCart();
    router.push('/checkout');  // Redirect to checkout page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found!</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{product.name}</h2>

      {/* Product Image */}
      <img src={product.imageUrl} alt={product.name} style={imageStyle} />

      {/* Product Details */}
      <div style={productInfoStyle}>
        <p style={descriptionStyle}>{product.description}</p>
        <p style={priceStyle}>Price: ${product.price}</p>

        {/* Add to Cart Button */}
        <button onClick={addToCart} style={addToCartButtonStyle}>
          Add to Cart
        </button>

        {/* Buy Now Button */}
        <button onClick={buyNow} style={buyNowButtonStyle}>
          Buy Now
        </button>
      </div>

      {/* Cart Icon */}
      <div style={cartIconStyle} onClick={() => router.push('/cart')}>
        <span role="img" aria-label="cart">🛒</span> {cart.length} items
      </div>
    </div>
  );
}

// Simple CSS styling for the component
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
  padding: '20px',
  backgroundColor: '#f7f9fc',
  position: 'relative',  // To position the cart icon
};

const titleStyle = {
  color: '#2c3e50',
  fontSize: '2rem',
  marginBottom: '20px',
};

const imageStyle = {
  width: '300px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '10px',
  border: '1px solid #ddd',
  marginBottom: '20px',
};

const productInfoStyle = {
  textAlign: 'center',
};

const descriptionStyle = {
  fontSize: '1.1rem',
  color: '#7f8c8d',
  marginBottom: '10px',
};

const priceStyle = {
  fontSize: '1.3rem',
  fontWeight: 'bold',
  color: '#e74c3c',
};

const addToCartButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  marginRight: '10px',
};

const buyNowButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
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