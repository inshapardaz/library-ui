import { Routes, BrowserRouter, Route } from "react-router-dom";

import Pages from "@/pages";

import LayoutWithHeader from "@/layout/layoutWithHeader";
import LayoutWithFooter from "@/layout/layoutWithFooter";
import SecurePage from "@/layout/securePage";

// ------------------------------------------------------------------

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutWithHeader />}>
                    <Route path="/" element={<Pages.HomePage />} />
                    <Route path="/libraries/:libraryId/books/:bookId" element={<Pages.BookPage />} />
                    <Route path="/libraries/:libraryId/books" element={<Pages.BooksPage />} />
                    <Route path="/libraries/:libraryId" element={<Pages.LibraryPage />} />
                    <Route path="/libraries" element={<Pages.LibrariesPage />} />
                    <Route element={<SecurePage />}>
                        <Route
                            path="/change-password"
                            element={<Pages.ChangePasswordPage />}
                        />
                    </Route>
                    <Route path="/403" element={<Pages.Error403Page />} />
                    <Route path="/500" element={<Pages.Error500Page />} />
                    <Route path="*" element={<Pages.Error404Page />} />
                </Route>
                <Route element={<LayoutWithFooter />}>
                    <Route path="/account/login" element={<Pages.LoginPage />} />
                    <Route path="/account/register" element={<Pages.RegisterPage />} />
                    <Route
                        path="/account/forgot-password"
                        element={<Pages.ForgotPasswordPage />}
                    />
                    {/* <Route
                        path="/account/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route path="/account/verify" element={<VerifyAccount />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;