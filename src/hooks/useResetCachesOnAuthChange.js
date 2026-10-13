import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { apiSlices } from "@/store";

// What the API returns depends on who is asking (anonymous visitors only get public data and
// public libraries), so whenever the signed-in user changes every cached response is dropped.
const useResetCachesOnAuthChange = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const identity = user ? String(user.id ?? user.email ?? user.name ?? 'user') : null;
    const previous = useRef(identity);

    useEffect(() => {
        if (previous.current !== identity) {
            previous.current = identity;
            apiSlices.forEach((api) => dispatch(api.util.resetApiState()));
        }
    }, [identity, dispatch]);
};

export default useResetCachesOnAuthChange;
