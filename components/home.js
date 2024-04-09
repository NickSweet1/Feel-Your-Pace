import { signOut, useSession } from "next-auth/react";
import Dashboard from "./dashboard";
import Login from "./login";

export default function AuthComponent() {
  const { data: session } = useSession();

  return <div>{!session ? <Login /> : <Dashboard />}</div>;
}
