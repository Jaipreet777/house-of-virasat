'use client';  // Ensure this is a Client Component

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference
import styles from "../cssFiles/header.module.css";// adjust the styles or path as necessary
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Header = () => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <a>
              <Image src="/logo.jpg" alt="House of Virasat" width={100} height={50} />
            </a>
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="cart">
          <button onClick={handleCartClick}>
            <span role="img" aria-label="cart">🛒</span> Cart
          </button>
          {showCart && (
            <div className="cart-dropdown">
              {/* Cart content will be rendered here */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;