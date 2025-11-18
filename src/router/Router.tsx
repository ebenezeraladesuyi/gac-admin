/* eslint-disable react-refresh/only-export-components */
import {lazy} from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";


const Sermon = lazy(() => import("../pages/dashboard/Sermon"));
const Gallery = lazy(() => import("../pages/dashboard/Gallery"));
const AllGama = lazy(() => import("../pages/dashboard/AllGama"));
const AllMinisters = lazy(() => import("../pages/dashboard/AllMinisters"));
const ElevationReg = lazy(() => import("../pages/dashboard/ElevationReg"));


export const element = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children : [
            {
                index: true,
                element: <ElevationReg />
            },
            {
                path: "uploadsermon",
                element: <Sermon />
            },
            {
                path: "gallery",
                element: <Gallery />
            },
            {
                path: "allgama",
                element: <AllGama />
            },
            {
                path: "allministers",
                element: <AllMinisters />
            },
        ]
    }
]);
