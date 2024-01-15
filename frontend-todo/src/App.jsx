import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import Todo from "./components/todos";
import AddTodo from "./components/addTodo";
import NavBar from "./components/NavBar";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./components/Landing";
import backgroundImage from "../src/images/image.jpg";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#ccc2fc",
        width: "100%",
        height: "100%",
        
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/todos" element={<Todo />}></Route>
          <Route path="/addTodos" element={<AddTodo />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
