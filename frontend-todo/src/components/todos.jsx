import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";

const Todos = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await axios.get("http://localhost:3000/user/todo");
          setTodos(prevTodos => [...prevTodos, ...response.data.todos]);
          console.log(todos);
          console.log(response.data.todos);
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      };
  
      fetchTodos();
    }, []);
  
    return (
      <div>
        <div>
          {todos.map(todo => (
            <div>
              {todo.title}
            </div>
          ))}
        </div>
      </div>
    );
}

export default Todos;