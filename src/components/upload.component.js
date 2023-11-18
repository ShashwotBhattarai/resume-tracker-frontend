import React from "react";
import axios from "axios";
import "./upload.css"

const Upload = () => {
  const formData = {
    fullname: "",
    email: "",
    phone_number:"",
    cv: null,
  };

  const handleInputChangeForFullName = (e) => {
    formData.fullname = e.target.value;
  };

  const handleInputChangeForEmail = (e) => {
    formData.email = e.target.value;
  };

  const handleInputChangeForPhoneNumber = (e) => {
    formData.phone_number = e.target.value;
  };

  const handleInputChangeForCV = (e) => {
    formData.cv = e.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullname" onChange={handleInputChangeForFullName} />
      </label>

      <br />

      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChangeForEmail} />
      </label>

      <br />

      <label>
        Phone Number:
        <input type="text" name="phoneNumber" onChange={handleInputChangeForPhoneNumber} />
      </label>

      <br />

      <label>
        CV:
        <input type="file" name="cv" onChange={handleInputChangeForCV} />
      </label>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Upload;
