import axios from "axios";
import jwt from "jsonwebtoken";

export async function login(formdata) {
	try {
		const response = await axios.post("http://localhost:3000/auth/login", formdata);

		if (response.status === 200) {
			const token = response.data.token;
			// Store the token in local storage
			localStorage.setItem("token", token);
			const decoded = jwt.decode(token);
			const role = decoded.role;
			return {
				status: 200,
				message: "User logged in successfully",
				data: { role: role },
			};
		} else {
			throw new Error("login failed");
		}
	} catch (error) {
		throw new Error("unknown error in login service");
	}
}
