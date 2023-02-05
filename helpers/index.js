const parseReadFilter = (readFilter) => {
    switch (readFilter) {
      case true:
        return 'read=true&';
      case false:
        return 'read=false&';
      default:
        return '';
    }
  };
  const defaultAuthorImage = '/images/author_placeholder.jpg';
  const defaultSeriesImage = '/images/series_placeholder.jpg';
  const defaultBookImage = '/images/book_placeholder.jpg';
  const defaultPageImage = '/images/page_placeholder.jpg';
  const defaultPeriodicalImage = '/images/periodical_placeholder.png';
  const defaultIssueImage = '/images/periodical_placeholder.png';
  
  const helpers = { 
    truncateWithEllipses: (text, max) => {
      if (!text) return text;
      return text.substr(0, max - 1) + (text.length > max ? '...' : '');
    },
    defaultAuthorImage,
    setDefaultAuthorImage: (ev) => {
      ev.target.src = defaultAuthorImage;
    },
    defaultSeriesImage,
    setDefaultSeriesImage: (ev) => {
      ev.target.src = defaultSeriesImage;
    },
    defaultBookImage,
    setDefaultBookImage: (ev) => {
      ev.target.src = defaultBookImage;
    },
    defaultPageImage,
    setDefaultPageImage: (ev) => {
      ev.target.src = defaultPageImage;
    },
    defaultPeriodicalImage,
    setDefaultPeriodicalImage: (ev) => {
      ev.target.src = defaultPeriodicalImage;
    },
    defaultIssueImage,
    setDefaultIssueImage: (ev) => {
      ev.target.src = defaultIssueImage;
    },
  
    parseNullableBool: (val) => {
      if (val === 'true') {
        return true;
      }
      if (val === 'false') {
        return false;
      }
      return null;
    },
    buildLinkToBooksPage: (
      location,
      page,
      pageSize,
      query,
      author,
      categories,
      series,
      sortBy,
      sortDirection,
      favorite,
      read,
      status,
    ) => {
      let querystring = '';
      querystring += page ? `pageNumber=${page}&` : '';
      querystring += pageSize ? `pageSize=${pageSize}&` : '';
      querystring += query ? `query=${query}&` : '';
      querystring += author ? `author=${author}&` : '';
      querystring += categories ? `categories=${categories}&` : '';
      querystring += series ? `series=${series}&` : '';
      querystring += sortBy && sortBy !== 'title' ? `sortBy=${sortBy}&` : '';
      querystring += sortDirection && sortDirection !== 'ascending' ? `sortDirection=${sortDirection}&` : '';
      querystring += favorite  && favorite !== false ? 'favorite=true&' : '';
      querystring += parseReadFilter(read);
      querystring += status && status !== 'published' ? `status=${status}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location}?${querystring}`;
      }
  
      return location;
    },
    buildLinkToAuthorsPage: (
      location,
      page,
      pageSize,
      query,
      authorType
    ) => {
      let querystring = '';
      querystring += page ? `pageNumber=${page}&` : '';
      querystring += pageSize ? `pageSize=${pageSize}&` : '';
      querystring += query ? `query=${query}&` : '';
      querystring += authorType ? `authorType=${authorType}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location}?${querystring}`;
      }
  
      return location;
    },
    buildLinkToBooksPagesPage: (location,
      page,
      pageSize,
      statusFilter,
      assignmentFilter) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += pageSize && pageSize !== 12 ? `pageSize=${pageSize}&` : '';
      querystring += statusFilter ? `filter=${statusFilter}&` : '';
      querystring += assignmentFilter ? `assignmentFilter=${assignmentFilter}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
    buildLinkToLibrariesPage: (location,
      page,
      query,
      pageSize = 12) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += query ? `q=${query}&` : '';
      querystring += pageSize && pageSize !== 12 ? `pageSize=${pageSize}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
    buildLinkToLibraryUsersPage: (location,
      page,
      query,
      pageSize = 12) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += query ? `q=${query}&` : '';
      querystring += pageSize && pageSize !== 12 ? `pageSize=${pageSize}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
    buildLinkToPeriodicalsPage: (
      location,
      page,
      query,
      category,
      frequencyFilter,
      sortBy,
      sortDirection,
    ) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += query ? `query=${query}&` : '';
      querystring += category ? `category=${category}&` : '';
      querystring += frequencyFilter && frequencyFilter !== 'All' ? `frequency=${frequencyFilter}&` : '';
      querystring += sortBy && sortBy !== 'title' ? `sortBy=${sortBy}&` : '';
      querystring += sortDirection && sortDirection !== 'ascending' ? `sortDirection=${sortDirection}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
    buildLinkToIssuesPage: (
      location,
      page,
      sortBy,
      sortDirection,
    ) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += sortBy && sortBy !== 'dateCreated' ? `sortBy=${sortBy}&` : '';
      querystring += sortDirection && sortDirection !== 'ascending' ? `sortDirection=${sortDirection}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
    buildLinkToIssuePagesPage: (location,
      page,
      pageSize,
      statusFilter,
      assignmentFilter) => {
      let querystring = '';
      querystring += page ? `page=${page}&` : '';
      querystring += pageSize && pageSize !== 12 ? `pageSize=${pageSize}&` : '';
      querystring += statusFilter ? `filter=${statusFilter}&` : '';
      querystring += assignmentFilter ? `assignmentFilter=${assignmentFilter}&` : '';
  
      if (querystring !== '') {
        if (querystring.substr(querystring.length - 1) === '&') {
          querystring = querystring.slice(0, -1);
        }
  
        return `${location.pathname}?${querystring}`;
      }
  
      return location.pathname;
    },
  };
  
  export default helpers;