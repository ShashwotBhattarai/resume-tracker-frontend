import { login } from "../services/login.service";
import axios from "axios";
jest.mock("axios");
import * as jwtdecodeModule from "jwt-decode";
const loginFormData = {
	username: "pujatest",
	password: "passwordTest",
};
describe("Login Service", () => {
	test("Login successful", async () => {
		axios.post.mockResolvedValue({ status: 200, data: { token: "tokenTest" } });
		const jwtdecodeSpy = jest.spyOn(jwtdecodeModule, "jwtDecode");
		jwtdecodeSpy.mockResolvedValue({ role: "admin" });
		const response = await login(loginFormData);
		expect(response.status).toBe(200);
	});
	test("Login unsuccessfull with response", async () => {
		axios.post.mockResolvedValue({ status: 500, data: { message: "some error" } });
		try {
			await login(formData);
		} catch (error) {
			expect(error).toEqual(new Error("unknown error in login service"));
		}
	});
});
