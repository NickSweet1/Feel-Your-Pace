import { signOut, useSession } from "next-auth/react";
import Dashboard from "./dashboard";
import Login from "./login";
import { useEffect, useState } from "react";

export default function AuthComponent() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Once the session status changes from loading to ready, update the loading state
    if (status === "authenticated" || status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  // Show loading spinner or any other loading indicator while checking session status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  console.log("Session data:", session);
  return <div>{!session ? <Login /> : <Dashboard />}</div>;
}
