import SpotifyWebApi from 'spotify-web-api-node';

// Create a Spotify API instance
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Handler function for the API route
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Authenticate with Spotify
      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body['access_token']);

      // Extract the genre from the request query parameters
      const { genre } = req.query;

      // Search for tracks in the specified genre
      const searchResults = await spotifyApi.searchTracks(`genre:"${genre}"`);

      // Extract the tracks from the search results
      const tracks = searchResults.body.tracks.items.map(item => ({
        id: item.id,
        name: item.name,
        artists: item.artists.map(artist => artist.name),
        album: item.album.name,
        release_date: item.album.release_date,
        image: item.album.images[0]?.url, // Get the first image URL if available
        preview_url: item.preview_url,
      }));

      // Return the list of tracks in the specified genre
      res.status(200).json(tracks);
    } catch (error) {
      console.error('Error fetching songs by genre:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}