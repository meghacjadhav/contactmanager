import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { APIContextProvider } from "./components/Context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HeaderComp from "./components/HeaderComp";
import Sidebar from "./components/SideBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <APIContextProvider>
        <Routes>
          <Route element={<SignUp />} path="/signup" />
          <Route element={<SignIn />} path="/" />
          <Route
            element={
              localStorage.getItem("token") ? (
                <HeaderComp />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
            path="/headercomp"
          />
          <Route element={<Sidebar />} path="/sidebar" />
        </Routes>
      </APIContextProvider>
    </Router>
  </React.StrictMode>
);
