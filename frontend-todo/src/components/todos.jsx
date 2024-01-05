import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/todo.css';
import { useNavigate } from 'react-router-dom';
import AddTodo from "../components/addTodo"; // Correct the import path

const Todos = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false); // State to manage visibility of AddTodo

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const storedToken = sessionStorage.getItem('jwtToken');
        const headers = {
          Authorization: `Bearer ${storedToken}`,
        };
        const response = await axios.get('http://localhost:3000/user/todo', { headers });
        setTodos(prevTodos => [...prevTodos, ...response.data.todos]);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/todo/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/user/todo/${id}`, formData);
      if (response.status === 200) {
        console.log('Todo updated successfully.');
      } else {
        console.log('Error in updating.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openAddTodo = () => {
    setShowAddTodo(true);
  };

  const closeAddTodo = () => {
    setShowAddTodo(false);
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
        <div className="todo-card empty-card" onClick={openAddTodo}>
          <span className="add-icon">+</span>
          <p>Add a new todo</p>
        </div>
      </div>

      {showAddTodo && (
        <div className="add-todo-overlay">
          <AddTodo onClose={closeAddTodo} />
        </div>
      )}
    </div>
  );
};

export default Todos;
