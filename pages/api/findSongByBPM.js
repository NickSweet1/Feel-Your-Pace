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

      // Extract the tempo range from the request query parameters
      const { minTempo, maxTempo } = req.query;

      // Search for tracks using a generic query (e.g., "a" or "the") to retrieve a large set of tracks
      const searchResults = await spotifyApi.searchTracks('the');

      // Extract the tracks from the search results
      const tracks = searchResults.body.tracks.items;

      // Array to store tracks within the specified tempo range
      const tracksWithinTempoRange = [];

      // Iterate over each track
      for (const track of tracks) {
        // Get detailed audio analysis for the track
        const audioAnalysis = await spotifyApi.getAudioAnalysisForTrack(track.id);

        // Extract tempo information from the audio analysis
        const tempo = audioAnalysis.body.track.tempo;

        // Check if the tempo falls within the specified range
        if (tempo >= minTempo && tempo <= maxTempo) {
          // Add the track to the array of tracks within the tempo range
          tracksWithinTempoRange.push({
            id: track.id,
            name: track.name,
            artists: track.artists.map(artist => artist.name),
            album: track.album.name,
            release_date: track.album.release_date,
            image: track.album.images[0]?.url, // Get the first image URL if available
            preview_url: track.preview_url,
            tempo: tempo,
          });
        }
      }

      // Return the list of songs within the specified tempo range
      res.status(200).json(tracksWithinTempoRange);
    } catch (error) {
      console.error('Error fetching songs by tempo range:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
