
'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav style={navStyle}>
      <div style={logoContainerStyle}>
        <Link href="/">
          <Image src="/logo.jppg" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link href="/about">About Us</Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/contact">Contact</Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

// Style for the navbar
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#2c3e50', // Dark grey background
  color: 'white',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Style for the logo container
const logoContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '20px',
};

// Style for the navbar list
const navListStyle = {
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

// Style for the navbar items
const navItemStyle = {
  margin: '0 20px',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
};

// Style for the navbar links
const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

navItemStyle[':hover'] = {
  color: '#27ae60', // Green color on hover
};