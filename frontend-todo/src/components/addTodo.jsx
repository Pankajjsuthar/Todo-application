import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const navigate = useNavigate();

  const getToken = () => {
    return sessionStorage.getItem('jwtToken');
  }

  const [todo, setTodo] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(todo);
      const response = await axios.post('http://localhost:3000/user/todo',todo,{
        headers : {
          'Content-Type' : 'application/json',
          'authorization' : `Bearer ${getToken()}`
        },
        data: {
          "title" : todo.title,
          "description" : todo.description
        },
        
      });
      if (response.status === 200) {
        console.log('Todo added successfully.');
        // You can add logic to handle the success, such as redirecting to the todos page
        navigate('/todos');
      } else {
        console.log('Error while adding a new todo.');
      }
    } catch (error) {
      console.error('Error while adding a new todo:', error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ccc2fc",
        width: "100%",
        height: "100%",
      }}
    >
    <div className='signup-container'>
      <form className="signup-form"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
          }}>
        <TextField
          variant="outlined"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          value={todo.title}
          label="title"
          type="text"

          fullWidth
        />
        <TextField
          style={{
            marginTop: '10px',
          }}
          variant="outlined"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
          label="description"
          type="text"
          fullWidth
        />
        <Button
          style={{
            marginTop: '10px',
            backgroundColor: '#2d2747',
            color: 'white',
          }}
          type="submit"
        >
          Add Todo
        </Button>
      </form>
    </div>
    </div>
  );
};

export default AddTodo;
