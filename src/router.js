import { Routes, BrowserRouter, Route } from 'react-router-dom';

import { Home, Login, Register, ForgotPassword, ChangePassword, Vrify, Error404, Error500 } from "./pages";

import LayoutWithFooter from './components/layout/layoutWithFooter';

const Router = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
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