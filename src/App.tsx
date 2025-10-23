import { useState } from "react";
import viteLogo from "/vite.svg";
import { ThemeProvider } from "./components/utils/theme-provider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./components/utils/PublicRoute";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signin from "./components/pages/Signin";
import Chats from "./components/pages/Chats";
// import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {/* <GlobalVarProvider> */}
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/create-account" element={<Signin />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chats" element={<Chats />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster richColors />
        </BrowserRouter>
        {/* </GlobalVarProvider> */}
      </ThemeProvider>
    </>
  );
}

export default App;
