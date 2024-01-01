import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./components/signup";
import { ErrorBoundary } from "react-error-boundary";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos when the component mounts
    fetch("http://localhost:3000/user/todo")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch todos");
        }
      })
      .then(async (data) => {
        await setTodos(data);
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path ="/" element = {<Signup/>}/>
          <Route path ="/login" element = {<Signup/>}/>
          <Route path ="/todos" element = {<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
