import React, { useState } from "react";
import axios from "axios";
import "./upload.css";

const Upload = () => {
	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		phone_number: "",
		cv: null,
	});
	const [message, setMessage] = useState("");

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
		console.log("Form submitted:", formData);
		const successMessage = "Might take few seconds to process it";
		setMessage(successMessage);

		try {
			// Retrieve the token from local storage
			const token = localStorage.getItem("token");

			const response = await axios.post("http://localhost:4000/candidate/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				},
			});

			console.log(response.data);
			const successMessage = "User details uploaded successfully";

			setMessage(successMessage);

			// Clear form data after successful submission
			setFormData({
				fullname: "",
				email: "",
				phone_number: "",
				cv: null,
			});

			// Clear the success message after a certain duration (e.g., 3 seconds)
			setTimeout(() => setMessage(""), 3000);
		} catch (error) {
			console.error("Error sending data to the backend:", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Full Name:
				<input
					type="text"
					name="fullname"
					value={formData.fullname}
					onChange={handleInputChangeForFullName}
				/>
			</label>

			<br />

			<label>
				Email:
				<input type="email" name="email" value={formData.email} onChange={handleInputChangeForEmail} />
			</label>

			<br />

			<label>
				Phone Number:
				<input
					type="text"
					name="phoneNumber"
					value={formData.phone_number}
					onChange={handleInputChangeForPhoneNumber}
				/>
			</label>

			<br />

			<label>
				CV:
				<input type="file" name="cv" onChange={handleInputChangeForCV} />
			</label>

			<br />

			<button type="submit">Submit</button>

			{message && <p>{message}</p>}
		</form>
	);
};

export default Upload;
