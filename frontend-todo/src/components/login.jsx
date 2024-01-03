import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import NavBar from "../components/NavBar";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );

      if (response.status === 200) {
        console.log(response.data.token);
        console.log("login successfull.");
        sessionStorage.setItem("jwtToken", response.data.token);
        navigate("/todos");
      } else {
        console.log("error while login.");
      }
    } catch (error) {
      console.log(error);
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
      <NavBar></NavBar>
      <div className="signup-container">
        <form
          className="signup-form"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
          }}
        >
          <h1>Login Page</h1>

          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            label="Email"
            type="email"
            fullWidth
          ></TextField>
          <TextField
            style={{
              marginTop: "10px",
            }}
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            label="Password"
            type="password"
            fullWidth
          ></TextField>
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "#2d2747",
              color: "white",
            }}
            type="submit"
            onSubmit={handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
