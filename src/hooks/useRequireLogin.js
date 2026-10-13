import { useCallback } from "react";
import { useSelector } from "react-redux";

// Local Imports
import { accountUrl } from '@/utils/returnUrl';

// Returns a wrapper for actions that need a signed-in user (favorite, shelf, bookmark, note).
// Signed in: runs the action. Signed out: sends the visitor to the main site login and back to
// this page afterwards.
const useRequireLogin = () => {
    const user = useSelector((state) => state.auth.user);

    const requireLogin = useCallback((action) => (...args) => {
        if (user) {
            return action?.(...args);
        }
        window.location.href = accountUrl('/account/login');
    }, [user]);

    return { isLoggedIn: user != null, requireLogin };
};

export default useRequireLogin;
