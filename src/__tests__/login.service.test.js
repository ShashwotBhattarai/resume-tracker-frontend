import { login } from "../services/login.service";
import axios from "axios";
import * as jwtdecodeModule from "jwt-decode";
jest.mock("axios");
const loginFormData = {
  username: "pujatest",
  password: process.env.mockPassword,
};
describe("Login Service", () => {
  test("Login successful", async () => {
    console.log(
      "process.env.AUTH_MICROSERVICE_URL",
      process.env.AUTH_MICROSERVICE_URL,
    );
    axios.post.mockResolvedValue({ status: 200, data: { token: "tokenTest" } });
    const jwtdecodeSpy = jest.spyOn(jwtdecodeModule, "jwtDecode");
    jwtdecodeSpy.mockResolvedValue({ role: "admin" });
    const response = await login(loginFormData);
    expect(response.status).toBe(200);
  });
  test("Login unsuccessfull with response", async () => {
    axios.post.mockResolvedValue({
      status: 500,
      data: { message: "some error" },
    });
    try {
      await login(loginFormData);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(new Error("unknown error in login service"));
    }
  });
});
