//https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

const getAccessTokenRefreshTime = (accessToken) => {
    const accessTokenJson = JSON.parse(atob(accessToken.split('.')[1]));
    return new Date(accessTokenJson.exp * 1000);
};

async function refreshAccessToken(tokenObject) {
    try {
        // Get a new set of tokens with a refreshToken
        const tokenResponse = await axios.post(`${baseUrl}/refresh-token`, {
            refreshToken: tokenObject.refreshToken
        });

        return {
            ...tokenObject,
            accessToken: tokenResponse.accessToken,
            accessTokenExpiry: getAccessTokenRefreshTime(tokenResponse.accessToken),
            refreshToken: tokenResponse.refreshToken
        }
    } catch (error) {
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials) => {
            try {
                // Authenticate user with credentials
                const user = await axios.post(`${baseUrl}/authenticate`, {
                    password: credentials.password,
                    email: credentials.email
                });
                
                if (user.data.accessToken) {
                    return user.data;
                }

                return null;
            } catch (e) {
                throw new Error(e);
            }
        }
    })
]

const callbacks = {
    jwt: async ({ token, user }) => {
        if (user) {
            // This will only be executed at login. Each next invocation will skip this part.
            token.accessToken = user.accessToken;
            token.accessTokenExpiry = getAccessTokenRefreshTime(user.accessToken);
            token.refreshToken = user.refreshToken;
            token.name = token.name;
            token.email = token.email;
        }

        const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 1000) - Date.now());

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }

        // If the call arrives after 23 hours have passed, we allow to refresh the token.
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.name = token.name;
        session.email = token.email;
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = getAccessTokenRefreshTime(token.accessToken);
        session.error = token.error;

        return Promise.resolve(session);
    },
}

export const options = {
    providers,
    callbacks,
    pages: {},
    secret: process.env.AUTH_SECRET
}

const Auth = (req, res) => NextAuth(req, res, options)
export default Auth;