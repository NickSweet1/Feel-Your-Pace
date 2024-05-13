import React from "react";

const PlaylistTemplate = ({ songList, onDelete }) => {
  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">New Playlist</h2>
      <ul>
        {songList.map((song, index) => (
          <li
            key={index}
            className="bg-white rounded p-2 mb-2 shadow flex items-center"
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
            </div>
            <button
              className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(index)}
            >
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
                  d="M5 12h14"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistTemplate;
