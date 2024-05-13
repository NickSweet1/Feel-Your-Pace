import React, { useState } from "react";
import PlaylistTemplate from "./playlistTemplate";
import CreateForm from "./createForm";
const createPlaylist = () => {
  const [songForPlaylist, setSongForPlaylist] = useState([]);

  const handleSongChoice = (song) => {
    setSongForPlaylist((prevSongs) => [...prevSongs, song]);
  };

  const handleDeleteSong = (index) => {
    setSongForPlaylist((prevSongs) =>
      prevSongs.filter((song, i) => i !== index)
    );
  };

  return (
<div className="flex">
  <div className="w-7/12">
    <CreateForm handleSongChoice={handleSongChoice} />
  </div>
  <div className="w-5/12">
    <PlaylistTemplate
      songList={songForPlaylist}
      onDelete={handleDeleteSong}
    />
  </div>
</div>

  );
};

export default createPlaylist;
