import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/components/profile/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" default element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home-page" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
