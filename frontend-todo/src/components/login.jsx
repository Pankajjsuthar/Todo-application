import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email : "",
    password : ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, 
     [ e.target.name] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post("http://localhost:3000/user/login",formData);

      if(response.status === 200){
        console.log(response.data.token);
        console.log("login successfull.");
        navigate("/todos");
      }
      else{
        console.log("error while login.");
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="signup-container">

      
      <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Login page</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" onSubmit={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login