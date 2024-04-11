import SpotifyWebApi from 'spotify-web-api-node';
import { getSession } from 'next-auth/react';

// Create a Spotify API instance
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    // Authenticate with Spotify API using the user's access token from the session
    spotifyApi.setAccessToken(session.user.accessToken);

    // Make API call to get current user's profile (which includes user ID)
    const response = await spotifyApi.getMe();

    // Extract Spotify user ID from the response
    const userId = response.body.id;

    // Return the Spotify user ID
    res.status(200).json({ userId });
  } catch (error) {
    console.error('Error retrieving user ID:', error);
    res.status(500).json({ error: 'Failed to retrieve user ID' });
  }
}