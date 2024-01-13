import { login } from "../services/login.service";
import formData from "../testData/formData";
import axios from "axios";
jest.mock("axios");
import jwt from "jsonwebtoken";

describe("Login Service", () => {
	test("Login successful", async () => {
		axios.post.mockResolvedValue({ status: 200, data: { token: "tokenTest" } });
		const jwtdecodeSpy = jest.spyOn(jwt, "decode");
		jwtdecodeSpy.mockResolvedValue({ role: "admin" });
		const response = await login(formData);
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
