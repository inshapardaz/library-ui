import { Routes, BrowserRouter, Route } from 'react-router-dom';

import { Home, Login, Register, ForgotPassword, ChangePassword, Vrify, Error404, Error500 } from "./pages";

import LibrariesHome from './pages/libraries'
import LibraryHome from './pages/libraries/library'
import BooksHomePage from './pages/books/index'
import BookPage from './pages/books/book'
import AuthorsHomePage from './pages/authors/index'
import SeriesHomePage from './pages/series/index'

import LayoutWithHeader from './components/layout/layoutWithHeader'
import LayoutWithFooter from './components/layout/layoutWithFooter';

const Router = () => {
    return (<BrowserRouter>
        <Routes>
            <Route element={<LayoutWithHeader />}>
                <Route path="/" element={<Home />} />
                <Route path="/libraries/" element={<LibrariesHome />} />
                <Route path="/libraries/:libraryId" element={<LibraryHome />} />
                <Route path="/libraries/:libraryId/books" element={<BooksHomePage />} />
                <Route path="/libraries/:libraryId/books/:bookId" element={<BookPage />} />
                <Route path="/libraries/:libraryId/authors" element={<AuthorsHomePage />} />
                <Route path="/libraries/:libraryId/series" element={<SeriesHomePage />} />
            </Route>
            <Route element={<LayoutWithFooter />} >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/verify" element={<Vrify />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="*" element={<Error404 />} />
            </Route>
        </Routes>
    </BrowserRouter>);
}

  export default Router;