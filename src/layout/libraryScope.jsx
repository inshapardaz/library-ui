import PropTypes from 'prop-types';
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

// Local imports
import { useGetLibraryQuery } from '@/store/slices/libraries.api';
import { LibraryContext } from '@/contexts';
import { setLastLibraryId } from '@/utils/libraryStorage';
import Error403Page from '@/pages/error403';
import SignInToContinuePage from '@/pages/signInToContinue';
// -----------------------------------------

// Loads the current library, exposes it through LibraryContext and remembers it as the last
// used one. Layouts wrap their shell in this and render <LibraryOutlet /> for the page.
export const LibraryScope = ({ children }) => {
    const { libraryId } = useParams();
    const { data: library, error } = useGetLibraryQuery({ libraryId }, { skip: !libraryId });

    useEffect(() => {
        if (libraryId && library) {
            setLastLibraryId(libraryId);
        }
    }, [libraryId, library]);

    return (
        <LibraryContext.Provider value={{ libraryId, library, error }}>
            {children}
        </LibraryContext.Provider>
    );
};

LibraryScope.propTypes = {
    children: PropTypes.node,
};

// Renders the routed page, except for members-only libraries: the API answers 403 to anonymous
// visitors and to signed-in non-members alike, so the auth state decides between "sign in" and
// "no access". The shell (header, footer) stays visible around either message.
export const LibraryOutlet = () => {
    const user = useSelector((state) => state.auth.user);
    const { libraryId, error } = useContext(LibraryContext) ?? {};

    if (libraryId && error?.status === 403) {
        return user ? <Error403Page /> : <SignInToContinuePage />;
    }

    return <Outlet />;
};
