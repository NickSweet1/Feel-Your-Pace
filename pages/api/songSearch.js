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

      // Extract the search query from the request query parameters
      const { query } = req.query;

      // Search for tracks by the given query
      const searchResults = await spotifyApi.searchTracks(query);

      // Extract the relevant information from the search results
      const tracks = searchResults.body.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name),
        album: track.album.name,
        release_date: track.album.release_date,
        image: track.album.images[0]?.url, // Get the first image URL if available
        preview_url: track.preview_url,
      }));

      // Return the search results
      res.status(200).json(tracks);
    } catch (error) {
      console.error('Error searching for tracks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}