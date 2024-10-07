import { Routes, BrowserRouter, Route } from "react-router-dom";

import {
    HomePage,
    // Login,
    // Register,
    // ForgotPassword,
    // ResetPassword,
    // ChangePassword,
    // VerifyAccount,
    // Error403,
    // Error404,
    // Error500,
} from "./pages";

import LayoutWithHeader from "/src/components/layout/layoutWithHeader";
// import LayoutWithFooter from "/src/components/layout/layoutWithFooter";
// import SecurePage from "/src/components/layout/securePage";

// ------------------------------------------------------------------

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutWithHeader />}>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route element={<SecurePage />}>
                    </Route>
                    <Route path="/500" element={<Error500 />} />
                    <Route path="/403" element={<Error403 />} />
                    <Route path="*" element={<Error404 />} /> */}
                </Route>
                {/* <Route element={<LayoutWithFooter />}>
                    <Route element={<SecurePage />}>
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                    </Route>
                    <Route path="/account/login" element={<Login />} />
                    <Route path="/account/register" element={<Register />} />
                    <Route
                        path="/account/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/account/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route path="/account/verify" element={<VerifyAccount />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;