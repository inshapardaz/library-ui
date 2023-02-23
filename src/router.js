import { createBrowserRouter, } from "react-router-dom";

import { Home, Login, Register, ForgotPassword, ChangePassword, Vrify, Error404, Error500 } from "./pages";

  const router = createBrowserRouter([{
        path: "/",
        element: <Home />
    }, {
        path: "/login",
        element: <Login />
    }, {
        path: "/register",
        element: <Register />
    }, {
        path: "/forget-password",
        element: <ForgotPassword />
    }, {
        path: "/change-password",
        element: <ChangePassword />
    }, {
        path: "/verify",
        element: <Vrify />
    }, {
        path: "/500",
        element: <Error500 />
    }, {
        path: "/404",
        element: <Error404 />
    }
  ]);

  export default router;