import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/image.jpg"

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(204, 194, 252, 0.2)",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h1" align="center" style={{
        marginTop: "-120px"
      }}>
        Organize your work <br />
        and life, finally.
      </Typography>
      <Button
        color="inherit"
        size="large"
        to="/signup"
        onClick={() => {
          navigate("/signup");
        }}
        variant="contained"
        style={{
          margin: "10px",
          backgroundColor: "#2d2747",
          color: "white",
          fontSize: "1.5rem", // Adjust the font size as needed
          padding: "15px 30px", // Adjust the padding as needed
        }}
      >
        Sign-Up
      </Button>
    </div>
  );
};

export default Landing;
