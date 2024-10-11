'use client';  // Use this to mark the file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use next/navigation for router
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';  // Import your Firebase configuration
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link href="/">Home</Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/about">About</Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/contact">Contact</Link>
          </li>
          <li style={navItemStyle}>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
// Style for the header
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f7f9fc', // Light grey-blue background
    borderBottom: '1px solid #bdc3c7', // Light grey border
  };
  
  // Style for the logo container
  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
  };
  
  // Style for the navigation
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  // Style for the navigation list
  const navListStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  };
  
  // Style for the navigation items
  const navItemStyle = {
    marginRight: '20px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  };