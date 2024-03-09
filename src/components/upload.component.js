import React, { useState } from "react";
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
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4 text-right">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChangeForFullName}
                required
                minLength="3"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChangeForEmail}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={formData.phone_number}
                onChange={handleInputChangeForPhoneNumber}
                required
                minLength="10"
                maxLength="14"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cv"
              >
                CV
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cv"
                type="file"
                name="cv"
                onChange={handleInputChangeForCV}
                required
                size={100}
              />
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {message && (
              <p className="text-center mt-4 text-red-500">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
