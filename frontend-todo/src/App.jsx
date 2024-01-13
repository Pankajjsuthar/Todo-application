import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import Todo from "./components/todos";
import AddTodo from "./components/addTodo";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todos" element={<Todo/>}></Route>
        <Route path="/addTodos" element={<AddTodo/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
