import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const dashboard = () => {
    const { data: session, status } = useSession();

    if (status === "loading" || !session) {
        return <p>Loading...</p>;
      }

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {session.user.image && <img src={session.user.image} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />}
        <p>Welcome, {session.user.name}</p>
    </div>
    <button onClick={() => signOut()}>Log out</button>
</>
  )
}

export default dashboard