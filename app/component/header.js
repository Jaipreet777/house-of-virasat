
'use client'; // Mark as a Client Component

import { useState } from 'react';
import { db } from '../../firebase'; // Firebase Firestore reference
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={logoContainerStyle}>
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={50} height={50} style={logoStyle} />
          </Link>
        </div>
        <div style={navLinksStyle}>
          <Link href="/" style={router.pathname === '/' ? activeLinkStyle : linkStyle}>
            Home
          </Link>
          <Link href="/about" style={router.pathname === '/about' ? activeLinkStyle : linkStyle}>
            About
          </Link>
          <Link href="/contact" style={router.pathname === '/contact' ? activeLinkStyle : linkStyle}>
            Contact
          </Link>
          <Link href="/sign-up" style={router.pathname === '/sign-up' ? activeLinkStyle : linkStyle}>
            Sign Up
          </Link>
          <Link href="/login" style={router.pathname === '/login' ? activeLinkStyle : linkStyle}>
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '800px',
  margin: 'auto',
};

const logoContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const logoStyle = {
  cursor: 'pointer',
};

const navLinksStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px',
  fontSize: '1.2rem',
  cursor: 'pointer',
};

const activeLinkStyle = {
  backgroundColor: '#27ae60',
  padding: '10px',
  borderRadius: '5px',
};