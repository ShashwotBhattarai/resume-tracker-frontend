import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/signUp.service";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupResponse = await SignUp(formData);
    if (signupResponse.status === 200) {
      // Handle successful signup
      const successMessage = "User sign up successfull";
      setMessage(successMessage);

      setTimeout(() => navigate("/"), 3000);
    } else {
      // Handle signup error
      const errorMessage = "Error signing up user";
      setMessage(errorMessage);
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
            minLength="8"
            maxLength="16"
          />
        </label>
        <br />

        <label>
          Email:
          {/*
           */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Role:
          {/*
           */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>
        <br />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;
