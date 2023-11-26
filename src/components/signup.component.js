import React, { useState } from "react";

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
		role: "",
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
			const response = await fetch("http://localhost:3000/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Handle successful signup
				console.log("User signed up successfully");
			} else {
				// Handle signup error
				console.error("Error signing up user");
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

			<label>
				Email:
				<input type="email" name="email" value={formData.email} onChange={handleChange} required />
			</label>
			<br />

			<label>
				Role:
				<input type="text" name="role" value={formData.role} onChange={handleChange} required />
			</label>
			<br />

			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
