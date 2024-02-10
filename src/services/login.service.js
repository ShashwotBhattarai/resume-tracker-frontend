import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function login(formdata) {
	try {
		console.log("formdata", formdata);
		console.log("process.env.AUTH_MICROSERVICE_URL", process.env.authUrl);
		const response = await axios.post(`http://localhost:3001/auth/login`, formdata);

		console.log("response", response);

		if (response.status === 200) {
			const token = response.data.token;
			// Store the token in local storage
			localStorage.setItem("token", token);
			const decoded = jwtDecode(token);
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
