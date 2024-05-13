import { getSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';

// Create a Spotify API instance
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.NEXTAUTH_URL + '/api/auth/callback/spotify',
});

// Handler function for the API route
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Get the user's session
      const session = await getSession({ req });

      if (!session) {
        // If the user is not logged in, return 401 Unauthorized
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      // Set the access token from the user's session
      spotifyApi.setAccessToken(session.user.accessToken);

      // Get the user's playlists
      const playlistsResponse = await spotifyApi.getUserPlaylists();

      // Extract relevant information from the playlists response
      const playlists = playlistsResponse.body.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name,
        tracks: playlist.tracks.total,
        imageUrl: playlist.images.length > 0 ? playlist.images[0].url : null,
      }));

      // Return the list of user's playlists
      res.status(200).json(playlists);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}