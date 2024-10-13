import { Routes, BrowserRouter, Route } from "react-router-dom";

import Pages from "./pages";

import LayoutWithHeader from "/src/components/layout/layoutWithHeader";
import LayoutWithFooter from "/src/components/layout/layoutWithFooter";
import SecurePage from "/src/components/layout/securePage";

// ------------------------------------------------------------------

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutWithHeader />}>
                    <Route path="/" element={<Pages.HomePage />} />
                    {/* <Route element={<SecurePage />}>
                    </Route>
                    <Route path="/500" element={<Error500 />} />
                    <Route path="/403" element={<Error403 />} />
                    <Route path="*" element={<Error404 />} /> */}
                    <Route element={<SecurePage />}>
                        <Route
                            path="/change-password"
                            element={<Pages.ChangePasswordPage />}
                        />
                    </Route>
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