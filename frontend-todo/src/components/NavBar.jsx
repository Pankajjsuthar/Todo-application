import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  const toLogin = () => {
    navigate("/login");
  };

  const getToken = () => {
    return sessionStorage.getItem("jwtToken");
  };
  const toSignUp = () => {
    navigate("/signup");
  };

  const logOut = () => {
    sessionStorage.setItem("jwtToken", null);
    setUserEmail(null);
    navigate("/login");
  };

  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      });
      // console.log(response.data);
      setUserEmail(response.data.email);
    }

    fetch();
  }, []);

  if (userEmail !== null) {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#8c7be3" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div>
              <h1>Your ToDo app</h1>
            </div>

            <div
              style={{
                color: "black",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Typography variant="h3" component="h3">
                {userEmail}
              </Typography>
              <Button
                color="inherit"
                to="/login"
                onClick={logOut}
                variant="contained"
                style={{
                  margin: "10px",
                  backgroundColor: "#2d2747",
                  color: "white",
                }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#8c7be3" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div>
              <h1>Your ToDo app</h1>
            </div>

            <div>
              <Button
                color="inherit"
                to="/login"
                onClick={toLogin}
                variant="contained"
                style={{
                  margin: "10px",
                  backgroundColor: "#2d2747",
                  color: "white",
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                to="/signup"
                onClick={toSignUp}
                variant="contained"
                style={{
                  margin: "10px",
                  backgroundColor: "#2d2747",
                  color: "white",
                }}
              >
                Sign-Up
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};
export default NavBar;
