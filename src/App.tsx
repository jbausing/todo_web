import { useState } from "react";
import viteLogo from "/vite.svg";
import { ThemeProvider } from "./components/utils/theme-provider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./components/utils/PublicRoute";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
// import "./App.css";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {/* <GlobalVarProvider> */}
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              {/* <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} /> */}
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
