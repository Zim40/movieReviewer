import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import Header from "./Components/Header/Header.jsx";
import SearchMovies from "./routes/SearchMovies.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/Register.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />, //Nav bar and header
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/searchMovies",
        element: <SearchMovies />
      }
    ],
  },
  //Other routes + elements ...
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
