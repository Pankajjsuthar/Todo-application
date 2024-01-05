import React, { useState } from "react";
import axios from "axios";
import "../style/signup.css"; // Import your CSS file for styling
import { TextField, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
        "http://localhost:3000/user/signup",
        formData
      );

      if (response.status === 200) {
        console.log("Signup successful.");
        navigate("/login");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error while signing up:", error.message);
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
      <NavBar />
      <div className="signup-container">
        <form
          className="signup-form"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
          }}
        >
          <h1>Signup page</h1>

          <TextField
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            label="Email"
            name="email"
            type="email"
            fullWidth
          />
          <TextField
            style={{
              marginTop: "10px",
            }}
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
            label="Password"
            name="password"
            type="password"
            fullWidth
          />
          <Button
            style={{
              marginTop :"10px",
              backgroundColor: "#2d2747",
              color : "white"
            }}
            type="submit"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
