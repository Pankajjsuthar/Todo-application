import React, { useState } from "react";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    setFormdata(e);
    // console.log(formdata);
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(e),
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

  return(
    <div>
        <form>
            <label >Email</label>
            <input type="email" id="email" name="email" required></input>
            <br></br>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required></input>
            <br></br>
            <button onClick={handleSubmit} type="submit" value="Sign Up">Sign Up</button>
        </form>
    </div>
  );
};

export default Signup;
