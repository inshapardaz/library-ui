import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Local Imports
import { fetchLibrary, getLibraryStatus}  from '../features/libraries/librarySlice'
import { fetchCategories, getCategoriesStatus}  from '../features/libraries/categoriesSlice'

// ----------------------------------------------

const LibraryProvider = ({children}) => {
    const dispatch = useDispatch()
    const { libraryId } = useParams()
    const libraryStatus = useSelector(getLibraryStatus)
    const categoriesStatus = useSelector(getCategoriesStatus)

    useEffect(() => {
        if (libraryId)
        { 
            if (libraryStatus === 'idle')
            {
                dispatch(fetchLibrary(libraryId))
            }

            if (categoriesStatus === 'idle')
            {
                dispatch(fetchCategories(libraryId))
            }
        }
    }, [categoriesStatus, dispatch, libraryId, libraryStatus])

    return children;
}

export default LibraryProvider;