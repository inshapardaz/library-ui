// Which content types get a sidebar in Explore: books, writings, poetry and periodicals do;
// authors and series are plain listings.
export const hasExploreSidebar = (type) => ['books', 'writings', 'poetry', 'periodicals'].includes(type);
