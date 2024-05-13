import React, { useState } from "react";
import axios from "axios";

const SongSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      // Make a GET request to your API endpoint with the search query
      const response = await axios.get(`/api/songSearch?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      setError("Error searching for tracks. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {searchResults.map((track) => (
          <li key={track.id} className="py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{track.name}</p>
                <p className="text-sm text-gray-600">
                  {track.artists.join(", ")}
                </p>
                <p className="text-sm text-gray-600">{track.album}</p>
              </div>
              {track.preview_url && (
                <audio
                  className="ml-4"
                  controls
                  src={track.preview_url}
                  style={{ width: "200px" }} // Adjust width as needed
                ></audio>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongSearch;
