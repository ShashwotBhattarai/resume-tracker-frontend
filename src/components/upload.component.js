import React, { useState } from "react";
import "./upload.css";
import { useNavigate } from "react-router-dom";
import { uploadCandidateInfo } from "../services/uploadCandidateInfo.service";

const Upload = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    cv: null,
  });
  const accessToken = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChangeForFullName = (e) => {
    setFormData({ ...formData, fullname: e.target.value });
  };

  const handleInputChangeForEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleInputChangeForPhoneNumber = (e) => {
    setFormData({ ...formData, phone_number: e.target.value });
  };

  const handleInputChangeForCV = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const successMessage = "Might take few seconds to process it";
    setMessage(successMessage);
    const response = await uploadCandidateInfo(formData, accessToken);

    if (response.status === 200) {
      setLoading(false);
      const successMessage = "User details uploaded successfully";

      setMessage(successMessage);

      // Clear form data after successful submission
      setFormData({
        fullname: "",
        email: "",
        phone_number: "",
        cv: null,
      });
      document.querySelector('input[type="file"]').value = null;

      setTimeout(() => setMessage(""), 3000);
    } else {
      setLoading(false);
      const errorMessage = "Something went wrong, Please try again";
      setMessage(errorMessage);
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Redirect to the home component
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          {/*
           */}
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChangeForFullName}
            required
            minLength="3"
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
            onChange={handleInputChangeForEmail}
            required
          />
        </label>

        <br />

        <label>
          Phone Number:
          {/*
           */}
          <input
            type="text"
            name="phoneNumber"
            value={formData.phone_number}
            onChange={handleInputChangeForPhoneNumber}
            required
            minLength="10"
            maxLength="14"
          />
        </label>

        <br />

        <label>
          CV:
          {/*
           */}
          <input
            type="file"
            name="cv"
            onChange={handleInputChangeForCV}
            required
            size={100}
          />
        </label>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && <p>{message}</p>}
      </form>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Upload;
