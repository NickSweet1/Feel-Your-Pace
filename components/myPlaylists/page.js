import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Page = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    if (session?.accessToken) {
      fetchPlaylists();
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="bg-gray-100 p-4 rounded-md">
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

