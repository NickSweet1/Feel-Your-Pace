import { signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex">
            <a
              href="#"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Feel Your Pace
            </a>
            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              My Playlists
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="text-white">
              <p className="text-sm">Welcome back,</p>
              <p className="font-semibold">{session?.user?.name}</p>
            </div>
            <button
              className="text-white hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
