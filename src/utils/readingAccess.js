// Content types readable without login when the library allows it. Books and periodical
// articles always need a login.
const PUBLIC_READABLE = ['poetry', 'writings'];

export const canReadWithoutLogin = (library, type) =>
    PUBLIC_READABLE.includes(type) && library?.allowPublicAccessToWritings === true;
