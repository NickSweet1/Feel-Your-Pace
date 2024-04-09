import { signIn } from 'next-auth/react';
import React from 'react';
import backgroundImage from '../public/cool-background.png';

const login = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage.src})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
        <p>Plan your next run with music to match the mood.</p>
        <p>Sync personalized playlists directly to your Spotify account, perfectly tailored to match your running or biking pace. Enjoy a seamless and invigorating journey with every stride or pedal!</p>
      </div>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <button onClick={() => signIn("spotify")}>Log in with spotify</button>
      </div>
    </div>
  );
};

export default login;