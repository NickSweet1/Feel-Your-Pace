import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const GenreSearch = ({ handleSongChoice }) => {
  const { data: session } = useSession();
  const [genre, setGenre] = useState("");
  const [bpm, setBpm] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const containerRef = useRef(null);

  const handleGenreSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentPage(1);
    setSongs([]);

    try {
      // Fetch songs based on genre with popularity sorting
      const genreResponse = await axios.get(
        `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=50&market=US&popularity=true`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      setTotalPages(Math.ceil(genreResponse.data.tracks.total / 50));
      setSongs(genreResponse.data.tracks.items.slice(0, 7));
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreSongs = useCallback(async () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);

      try {
        const genreResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=50&market=US&popularity=true&offset=${
            currentPage * 50
          }`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        setSongs((prevSongs) => [
          ...prevSongs,
          ...genreResponse.data.tracks.items.slice(
            (currentPage - 1) * 50,
            currentPage * 50
          ),
        ]);
      } catch (error) {
        console.error("Error fetching more songs:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentPage, totalPages, genre, session.accessToken]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      loadMoreSongs();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleGenreSearch} className="mb-4">
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
          placeholder="Enter BPM (Optional)"
          className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}

      <div
        ref={containerRef}
        className="max-h-96 overflow-y-auto"
        onScroll={handleScroll}
      >
        <ul className="grid grid-cols-1 gap-4">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex items-center py-2 px-4 bg-white shadow-md rounded-md"
            >
              <img
                src={song.album.images[0].url}
                alt={song.name}
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="font-semibold">{song.name}</p>
                <p className="text-gray-600">
                  Artist: {song.artists.map((artist) => artist.name).join(", ")}
                </p>
                {song.preview_url ? (
                  <audio controls className="mt-2" style={{ width: "100%" }}>
                    <source src={song.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p>No preview available</p>
                )}
              </div>
              <div onClick={() => handleSongChoice(song)} className='text-green-700 hover:cursor-pointer'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenreSearch;
