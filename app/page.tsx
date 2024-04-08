"use client";
import Login from '../components/login';
import { SessionProvider } from 'next-auth/react';

export default function Home() {
  return (
    <SessionProvider>
    <div>
    <h1>Welcome to My App</h1>
    <Login />
    {/* Other content */}
  </div>
    </SessionProvider>
  );
}
