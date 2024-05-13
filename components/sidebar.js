import React from "react";

const sidebar = (props) => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-600 text-white w-64">
        <div className="p-6">
          <ul className="mt-6">
            <li className="py-2">
              <div
                className="flex items-center"
                onClick={() => props.onSidebarItemClick("home")}
              >
                Home
              </div>
            </li>
            <li className="py-2">
              <div
                className="flex items-center"
                onClick={() => props.onSidebarItemClick("playlists")}
              >
                My Playlists
              </div>
            </li>
            <li className="py-2">
              <div
                className="flex items-center"
                onClick={() => props.onSidebarItemClick("createPlaylist")}
              >
                Create Playlist
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
