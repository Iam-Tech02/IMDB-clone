import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./Privateroutes"
import Login  from "../screen/LoginPage"
import Home from "../screen/Home"
import SearchResultsPage  from "../screen/SearchResultPage"
import TitleDetailPage from "../screen/moviesDetailPage"
import Layout from "../screen/Layout";
import Signup from "../screen/SignupPage";

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "/", element: <Home/> },
            { path: "/search", element: <SearchResultsPage /> },
            { path: "/title/:id", element: <TitleDetailPage /> },
          ],
        },
      ],
    },
  ]);






