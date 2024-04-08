// Import necessary modules
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

      // Extract the song name from the request query parameters
      const { name } = req.query;

      // Search for tracks by the given name
      const searchResults = await spotifyApi.searchTracks(name);

      // Extract the Spotify ID of the first track found
      const trackId = searchResults.body.tracks.items[0].id;

      // Get the audio analysis of the track by its ID
      const audioAnalysis = await spotifyApi.getAudioAnalysisForTrack(trackId);

      // Extract the tempo from the audio analysis
      const tempo = audioAnalysis.body.track.tempo;

      // Return the tempo of the song
      res.status(200).json({ tempo });
    } catch (error) {
      console.error('Error fetching tempo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}