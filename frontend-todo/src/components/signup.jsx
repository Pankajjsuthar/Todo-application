import React, { useState } from "react";
import axios from "axios";
import "../style/signup.css"; // Import your CSS file for styling
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
      const response = await axios.post("http://localhost:3000/user/signup", formData);

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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Signup page</h1>
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
        <button type="submit" onSubmit={handleSubmit}>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
