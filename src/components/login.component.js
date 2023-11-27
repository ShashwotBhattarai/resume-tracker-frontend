import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:3000/auth/login", formData);

			if (response.status === 200) {
				const { token } = response.data.message;

				// Store the token in local storage
				localStorage.setItem("token", token);

				const decoded = jwtDecode(token);

				

				// Handle successful login
				console.log("User logged in successfully"+decoded);

				// y

				// Redirect or perform any other actions after successful login
			} else {
				// Handle login error
				console.error("Error logging in");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input type="text" name="username" value={formData.username} onChange={handleChange} required />
			</label>
			<br />

			<label>
				Password:
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
	);
};

export default LoginForm;
