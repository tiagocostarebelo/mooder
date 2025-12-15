import { createBrowserRouter } from "react-router";
import LandingPage from "../landing/LandingPage";
import AppPage from "../app/AppPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/app",
        element: <AppPage />,
    }
])