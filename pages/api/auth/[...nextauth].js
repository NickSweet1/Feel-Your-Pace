import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshAccessToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshAccessToken.access_token,
      accessTokenExpires: Date.now + refreshAccessToken.expires_in * 1000,
      spotifyApi,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
      profile(profile) {
        return {
            id: profile.id,
            name: profile.display_name,
            email: profile.email,
            image: profile.images?.[0]?.url,
        }
      }
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //on initial signin
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refreshToken,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //handle expiry times in milliseconds
        };
      }

      //if access token isn't expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING TOKEN IS VALID");
        return token;
      }

      //access token has expired, we refresh the token
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },
  },

  async session({ session, token }) {
    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    session.user.username = token.username;

    return session;
  },
};

export default NextAuth(authOptions);
