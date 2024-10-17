import { useParams } from "react-router-dom";

const LibraryPage = () => {
        const { libraryId } = useParams();

        return `Library : ${libraryId}`;

}

export default LibraryPage;