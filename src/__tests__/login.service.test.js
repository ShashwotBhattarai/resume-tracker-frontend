import { login } from "../services/login.service";
import mockAxios from "jest-mock-axios";
import formData from "../testData/formData";
import * as axios from "axios";

describe("Login Service", () => {
	afterEach(() => {
		mockAxios.reset();
	});
	test("Login successful", async () => {
		mockAxios.mockResponse({ status: 200, data: { token: "tokenTest" } });
		const response = await login(formData);

		expect(response.status).toBe(200);
	});
});
