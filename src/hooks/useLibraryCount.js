import { useGetLibrariesQuery } from "@/store/slices/libraries.api";

// The libraries the API returns for the current visitor (anonymous visitors only get public
// ones). Shares its cache entry with the site root, so the shell costs no extra request.
const useLibraryCount = () => {
    const { data, isFetching } = useGetLibrariesQuery({ pageSize: 100 });
    const libraries = data?.data ?? [];
    return { libraries, count: libraries.length, isFetching };
};

export default useLibraryCount;
