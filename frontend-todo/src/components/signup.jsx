import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        
        console.log("Signup successfull.");
      }
      else{
        console.log("Error");
      }
    } catch {
        console.log("Error while signing up.");
    }
  };
};

export default Signup;
