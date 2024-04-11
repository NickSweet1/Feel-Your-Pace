import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { useSession } from "next-auth/react";
import axios from "axios";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`/api/getUserId`, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          params: {
            email: session.user.email,
          },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    if (session) {
      fetchUserId();
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <>
      <NavBar />
      <div>User ID: {userId}</div>
    </>
  );
};

export default Dashboard;