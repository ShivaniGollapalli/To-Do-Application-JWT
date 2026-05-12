import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Todo from "./components/ToDo.jsx";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Register />}></Route>
      <Route path="/todoList" element={<Todo />}></Route>
    </Routes>
  </BrowserRouter>
);
