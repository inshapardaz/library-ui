import PropTypes from 'prop-types';
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Local Imports
import { LibraryContext } from '@/contexts';
import { canReadWithoutLogin } from '@/utils/readingAccess';
import ProtectedRoute from './protectedRoute';

// -----------------------------------

// Guards the poetry and writing readers. Whether they can be read anonymously is decided per
// library by `allowPublicAccessToWritings` on the GET library response; when the flag is false
// or absent they behave like books and need a login.
const ReadingGate = ({ type }) => {
    const user = useSelector((state) => state.auth.user);
    const { library } = useContext(LibraryContext) ?? {};

    if (!user && canReadWithoutLogin(library, type)) {
        return <Outlet />;
    }

    return <ProtectedRoute />;
};

ReadingGate.propTypes = {
    type: PropTypes.oneOf(['poetry', 'writings']).isRequired,
};

export default ReadingGate;
