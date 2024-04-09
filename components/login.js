import { signIn } from "next-auth/react";
import React from "react";
import backgroundImage from "../public/cool-background.png";

const login = () => {
  return (
    <div
      className="bg-cover min-h-screen flex flex-col justify-center items-center p-20"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="max-w-2xl text-center mb-20 text-white">
        <p>Plan your next run with music to match the mood.</p>
        <p>
          Sync personalized playlists directly to your Spotify account,
          perfectly tailored to match your running or biking pace. Enjoy a
          seamless and invigorating journey with every stride or pedal!
        </p>
      </div>
      <div
        className="bg-white bg-opacity-80 p-1 rounded-lg text-center cursor-pointer"
        onClick={() => signIn("spotify")}
      >
        <button className="px-4 py-2 text-black rounded-lg">
          Log in with Spotify
        </button>
      </div>
    </div>
  );
};

export default login;
