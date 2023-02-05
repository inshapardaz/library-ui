import axios from 'axios';
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/libraries`;

const libraryUrl = libraryId => `${baseUrl}/${libraryId}`;

const getQueryParameter = (query) => (query ? `&query=${query}` : '');

const parseObject = (source) => {
  if (source) {
    if (source.links) {
      const newLinks = {};
      source.links.forEach((link) => {
        newLinks[link.rel.replaceAll('-', '_')] = link.href;
      });
      source.links = newLinks;
    }

    if (source.data) {
      const newItems = [];
      source.data.forEach((item) => newItems.push(parseObject(item)));
      source.data = newItems;
    }

    if (source.files) {
      const newItems = [];
      source.files.forEach((item) => newItems.push(parseObject(item)));
      source.files = newItems;
    }

    if (source.contents) {
      const newItems = [];
      source.contents.forEach((item) => newItems.push(parseObject(item)));
      source.contents = newItems;
    }

    if (source.authors) {
      const newItems = [];
      source.authors.forEach((item) => newItems.push(parseObject(item)));
      source.authors = newItems;
    }

    if (Array.isArray(source)) {
      const newItems = [];
      source.forEach((item) => newItems.push(parseObject(item)));
      return newItems;
    }
  }

  return source;
};

const get = (url) => {
    return axios({
        method: 'get',
        url: url,
    })
    .then((response) => parseObject(response.data))
};

const handleResponse = (response) => {
    const data = response.data;
    
    if (!response.ok) {
        if ([401, 403].includes(response.status) && isUserLoggedIn()) {
            // TODO : Do a token refresh
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            // accountService.logout();
        }

        return Promise.reject({ status: response.status, statusText: response.statusText });
    }

    return data;
};

class LibraryService {
    getLibraries(query = null, page = 1, pageSize = 12) {
        return get(`${baseUrl}?pageNumber=${page}&pageSize=${pageSize}${getQueryParameter(query)}`)
    }

    getLibrary(library) {
      return get(libraryUrl(library))
    }

    /* --------------- Books ---------------------- */
    getLatestBooks(library) {
      return get(`${libraryUrl(library)}/books?pageNumber=1&pageSize=12&sortby=DateCreated&sortDirection=descending`);
    }

    getBooks(library,
          query = null,
          author = null,
          categories = null,
          series = null,
          sortBy = null,
          sortDirection = null,
          favorite = null,
          read = null,
          status = null,
          pageNumber = 1,
          pageSize = 12)
    {
      let queryVal = query ? `&query=${query}` : '';
      if (author) {
        queryVal += `&authorId=${author}`;
      }
      if (categories) {
        queryVal += `&categoryId=${categories}`;
      }
      if (series) {
        queryVal += `&seriesId=${series}`;
      }
      if (sortBy) {
        queryVal += `&sortBy=${sortBy}`;
      }
      if (favorite) {
        queryVal += '&favorite=true';
      }
      if (read !== undefined && read !== null) {
        queryVal += `&read=${read}`;
      }
      if (status) {
        queryVal += `&status=${status}`;
      }
      if (sortDirection) {
        queryVal += `&sortDirection=${sortDirection}`;
      }
  
      return get(`${libraryUrl(library)}/books?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`);
    }

    /* --------------- Authors ------------------------- */

    getAuthors(library,
      query = null,
      authorType = null,
      pageNumber = 1,
      pageSize = 12) {
        let queryVal = query ? `&query=${query}` : '';
        if (authorType) {
          queryVal += `authorType=${authorType}`;
        }
        return get(`${libraryUrl(library)}/authors?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`);
    }

    /* --------------- Categories ---------------------- */
    getCategories(library) {
      return get(`${libraryUrl(library)}/categories`);
    }

    /* --------------- Series ---------------------- */
    getSeries(library,
      query = null,
      pageNumber = 1,
      pageSize = 12) {
        let queryVal = query ? `&query=${query}` : '';
        return get(`${libraryUrl(library)}/series?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`);
    }
}

const service = new LibraryService();
export default service;