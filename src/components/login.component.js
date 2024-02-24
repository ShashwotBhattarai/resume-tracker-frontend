import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../services/login.service";
import { toast } from "react-toastify";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.status === 500) {
      toast.error("login failed please try again");
      return;
    }
    const { role } = response.data;
    if (role === "candidate") {
      navigate("/upload"); // Redirect to the upload component
    } else if (role === "recruiter") {
      navigate("/download");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          {/*
           */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          {/*
           */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
