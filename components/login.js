// components/AuthComponent.js

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthComponent() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('spotify')}>Log in with Spotify</button>
      ) : (
        <button onClick={() => signOut()}>Log out</button>
      )}
    </div>
  );
}
