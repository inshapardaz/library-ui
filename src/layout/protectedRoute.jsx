import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Local Imports
import { MAIN_SITE } from '@/config';
import { accountUrl } from '@/utils/returnUrl';

// -----------------------------------

// Wraps routes that need a signed-in user (the readers and My Library). Everything else in the
// app is public. Anonymous visitors are sent to the main site's login and come back to this
// page afterwards (see accountUrl).
const ProtectedRoute = () => {
    const userLoadStatus = useSelector((state) => state?.auth?.loadUserStatus);
    const user = useSelector((state) => state.auth.user);
    const resolved = userLoadStatus === 'succeeded' || userLoadStatus === 'failed';

    useEffect(() => {
        if (resolved && !user && !window.location.href.includes(MAIN_SITE)) {
            window.location.href = accountUrl('/account/login');
        }
    }, [user, resolved]);

    // Render nothing for anonymous visitors so protected content never flashes (or fetches)
    // before the redirect happens.
    return user ? <Outlet /> : null;
};

export default ProtectedRoute;
