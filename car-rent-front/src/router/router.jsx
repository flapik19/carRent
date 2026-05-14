// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Admin from "../pages/Admin/Admin";
import Reports from "../pages/Reports/Reports";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin", element: <Admin /> },
    { path: "/reports", element: <Reports /> },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;