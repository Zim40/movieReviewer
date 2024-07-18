import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import Header from "./Components/Header/Header.jsx";
import App from "./App.jsx";
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
        path: "/app",
        element: <App />,
      },
    ],
  },
  //Other routes + elements ...
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
