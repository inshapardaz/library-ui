import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            console.log('session has token error')

            signOut({ callbackUrl: '/login', redirect: shouldRedirect });
        }

        if (session === null) {
            console.log('session is null')
            if (router.route !== '/login') {
                router.replace('/login');
            }
            setIsAuthenticated(false);
        } else if (session !== undefined) {
            console.log('session is undefined')

            if (router.route === '/login') {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [router, session, shouldRedirect]);

    return isAuthenticated;
}