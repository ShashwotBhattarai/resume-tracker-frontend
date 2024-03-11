import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "../config/routes/constants";

export async function login(formdata) {
  try {
    const config = {
      headers: {
        username: formdata.username,
        password: formdata.password,
      },
    };
    const response = await axios.post(
      `${ROUTES.AUTH_MICROSERVICE_URL}/auth/login`,
      {},
      config,
    );
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
      return {
        status: 500,
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
}
