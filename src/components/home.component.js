// Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Resume Tracker App</h2>
      <div>
        <Link to="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "bold",
};

export default Home;
