import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
import '../style/todo.css';
const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [formData,setFormData] = useState([]);

    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const storedToken = sessionStorage.getItem("jwtToken");
          const headers = {
            // Set the Authorization header with the JWT token
            Authorization: `Bearer ${storedToken}`,
            // Other headers...
          };
          console.log(headers);
          const response = await axios.get("http://localhost:3000/user/todo", {headers});
          await setTodos(prevTodos => [...prevTodos, ...response.data.todos]);
          console.log(todos);
          console.log(response.data.todos);
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      };
  
      fetchTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
          // Make an API call to delete the todo with the given id
          await axios.delete(`http://localhost:3000/user/todo/${id}`);
          // Update the state to remove the deleted todo
          setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      };
    
      const handleEdit = async (id) => {
        // Add logic to handle editing, e.g., navigate to an edit page
        try{
            const response = await axios.put(`http://localhost:3000/user/todo/${id}`, formData);
            if(response.status===200){
                console.log("Todo updated successfully.");
            }
            else{
                console.log("Error in updating.");
            }
        }
        catch(error){
            console.log(error);
        }
      };
    
      const addTodo = () => {
        // Add logic to handle adding a new todo (e.g., show a modal or navigate to a new page)
        console.log("Adding a new todo");
      };
  
    return (
      <div>
        <div className="todos-container">
      {todos.map(todo => (
        <div key={todo._id} className="todo-card">
          <div className="todo-header">
            <h3>{todo.title}</h3>
            <span className="date-posted">{new Date(todo.date).toLocaleString()}</span>
          </div>
          <p className="todo-description">{todo.description}</p>
          <div className="todo-actions">
            <button onClick={() => handleEdit(todo._id)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        </div>
      ))}
      <div className="todo-card empty-card" onClick={addTodo}>
        <span className="add-icon">+</span>
        <p>Add a new todo</p>
      </div>
    </div>
    </div>
    );
}

export default Todos;