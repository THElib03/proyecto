import { createBrowserRouter, Outlet } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";

import UserProtectedRoute from "../components/UserProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Bonds from "../pages/Bonds";
import Promos from "../pages/Promos";
import Admin from "../pages/Admin";
import Buses from "../pages/Buses";
import Routes from "../pages/Routes";
import Stations from "../pages/Stations";
import MyTickets from "../pages/MyTickets";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "bonds",
                element: <Bonds />,
            },
            {
                path: "promos",
                element: <Promos />,
            },
            {
                path: "profile",
                element: <UserProtectedRoute />,
                children: [
                    {
                        element: <UserLayout />,
                        children: [
                            {
                                index: true,
                                element: <Profile />,
                            },
                            {
                                path: "my-tickets",
                                element: <MyTickets />,
                            },
                            {
                                path: "settings",
                                element: <Settings />,
                            },
                        ]
                    }
                ]
            },
            {
                path: "admin",
                element: <AdminProtectedRoute />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            {
                                index: true,
                                element: <Admin />,
                            },
                            {
                                path: "buses",
                                element: <Buses />,
                            },
                            {
                                path: "routes",
                                element: <Routes />,
                            },
                            {
                                path: "stations",
                                element: <Stations />,
                            },
                        ]
                    },
                ],
            },
        ],
    },
]);
