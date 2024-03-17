import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/signUp.service";
import Spinner from "./loader.component";
import InputField from "./inputField.component";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

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
    setLoading(true);

    const signupResponse = await SignUp(formData);
    if (signupResponse.status === 200) {
      const successMessage = "User sign up successful";
      setLoading(false);
      setMessage(successMessage);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } else {
      const errorMessage = "Error signing up user";
      setLoading(false);
      setMessage(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <InputField
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            pattern="[A-Za-z0-9!@#$%^&*()_+=-]+"
            title="Username can contain letters, numbers, and special characters like !@#$%^&*()_+=-."
            required
          />

          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            maxLength="16"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}"
            title="Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            required
          />

          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="^[^@\s]+@[^@\s]+\.[c][o][m]$"
            title="Email address must end with .com"
          />

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {loading && <Spinner />}
          {message && (
            <p
              className={`mt-4 px-4 py-2 rounded ${success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
