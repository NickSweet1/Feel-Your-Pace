import { useState } from "react";
import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [distanceUnit, setDistanceUnit] = useState(""); // State to manage the selected distance unit
  const [runningPace, setRunningPace] = useState(""); // State to manage the selected running pace

  // Function to handle changes in the distance unit selection
  const handleDistanceUnitChange = (event) => {
    setDistanceUnit(event.target.value);
  };

  // Function to handle changes in the running pace selection
  const handleRunningPaceChange = (event) => {
    setRunningPace(event.target.value);
  };

  // Generate options for running pace dropdown
  const runningPaceOptions = [];
  for (let minutes = 7; minutes <= 20; minutes++) {
    for (let seconds = 0; seconds < 60; seconds += 30) {
      const time = `${minutes < 10 ? "0" + minutes : minutes}:${seconds === 0 ? "00" : seconds}`;
      runningPaceOptions.push(time);
    }
  }

  if (status === "loading" || !session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8">Quick Create</h1>
        <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Preferred Unit of Measurement:</h2>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                value="miles"
                checked={distanceUnit === "miles"}
                onChange={handleDistanceUnitChange}
              />
              <span className="ml-2 text-gray-700">Miles</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                value="kilometers"
                checked={distanceUnit === "kilometers"}
                onChange={handleDistanceUnitChange}
              />
              <span className="ml-2 text-gray-700">Kilometers</span>
            </label>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Let's customize your running experience:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="runningPace" className="block text-gray-700 font-medium mb-2">What is your running pace?</label>
              <select
                id="runningPace"
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:border-blue-500"
                value={runningPace}
                onChange={handleRunningPaceChange}
              >
                <option value="">Select running pace...</option>
                {runningPaceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="runningDistance" className="block text-gray-700 font-medium mb-2">How far are you running?</label>
              <input type="text" id="runningDistance" className="border rounded-md w-full px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label htmlFor="musicPreference" className="block text-gray-700 font-medium mb-2">What type of music would you like to hear?</label>
              <select id="musicPreference" className="border rounded-md w-full px-3 py-2 focus:outline-none focus:border-blue-500">
                <option value="">Select music preference...</option>
                <option value="upbeat">Upbeat</option>
                <option value="chill">Chill</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="electronic">Electronic</option>
              </select>
            </div>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Create Playlist</button>
      </div>
    </>
  );
};

export default Dashboard;
