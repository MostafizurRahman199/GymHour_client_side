import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
 // Import Routes and Route
import "./index.css";
import Home from "./pages/Home";
import AddSchedule from "./pages/AddSchedule";
import AllSchedule from "./pages/AllSchedule";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "./Providers/AuthProvider";
import StaticSchedule from "./pages/StaticSchedule";

createRoot(document.getElementById("root")).render(
  <StrictMode>
 <AuthProvider>
 <BrowserRouter>
      <Routes>
        {/* Home route with nested child routes */}
        <Route path="/" element={<Home />}>
          <Route path="/" element={<StaticSchedule/>} />
          <Route path="addSchedule" element={<AddSchedule />} />
          <Route path="allSchedule" element={<AllSchedule />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
 </AuthProvider>
  </StrictMode>
);
