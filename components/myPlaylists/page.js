import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Page = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  
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

  // Filter playlists based on the current tab
  const filteredPlaylists = playlists.filter((playlist) => {
    if (currentTab === 'my') {
      return playlist.owner.display_name === session.user.name;
    } else if (currentTab === 'others') {
      return playlist.owner.display_name !== session.user.name;
    }
    return true; // Show all playlists for the 'all' tab
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-4">
        <button
          className={`mr-4 ${currentTab === 'all' ? 'font-bold' : ''}`}
          onClick={() => setCurrentTab('all')}
        >
          All Playlists
        </button>
        <button
          className={`mr-4 ${currentTab === 'my' ? 'font-bold' : ''}`}
          onClick={() => setCurrentTab('my')}
        >
          My Playlists
        </button>
        <button
          className={`mr-4 ${currentTab === 'others' ? 'font-bold' : ''}`}
          onClick={() => setCurrentTab('others')}
        >
          Others Playlists
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaylists.map((playlist) => (
          <li key={playlist.id} className="bg-gray-100 p-4 rounded-md">
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
