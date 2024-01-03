import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const toLogin = ()=>{
        navigate("/login");
    }

    const toSignUp = ()=>{
        navigate("/signup");
    }
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#8c7be3" }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div>
            <h1>Your ToDo app</h1>
          </div>
          <div>
            <Button color='inherit' to="/login" onClick={toLogin} variant='contained' style={{
                margin :"10px",
                backgroundColor: "#2d2747",
                color : "white"
            }}>
              Login
            </Button>
            <Button color='inherit' to="/signup" onClick={toSignUp} variant='contained' style={{
                margin :"10px",
                backgroundColor: "#2d2747",
                color : "white"
            }}>
              Sign-Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
