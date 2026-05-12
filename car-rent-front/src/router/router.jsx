// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Admin from "../pages/Admin/Admin";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <Admin /> },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;