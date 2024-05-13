import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import MyPlaylists from "./myPlaylists/page";
import CreatePlaylist from "./createPlaylist/page";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item); // Update the selected item state
  };

  const componentToRender = () => {
    switch (selectedItem) {
      case "playlists":
        return <MyPlaylists />;
      case "createPlaylist":
        return <CreatePlaylist />;
      default:
        return (
          <div>
            Welcome to your homepage! Use the side bar to navigate around and
            start making some playlists for your workout!
          </div>
        );
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar onSidebarItemClick={handleSidebarItemClick} />
        <div className="flex-grow">{componentToRender()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
