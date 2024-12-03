import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";

const router = createBrowserRouter({

  path: "/",
  element: <App />,
  children: [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ],
});

export default router;
