/* eslint-disable jest/no-conditional-expect */
import { SignUp } from "../services/signUp.service";

const fetchMock = require("fetch-mock-jest");
const signUpFormData = {
  username: "pujatest",
  password: process.env.mockPassword,
  email: "test@gmail.com",
  role: "candidateTest",
};
describe("SignUp", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });
  test("SignUp successfull", async () => {
    fetchMock.post("http://localhost:3001/auth/signup", 201);
    const response = await SignUp(signUpFormData);
    expect(response.status).toBe(200);
  });

  test("known error from backend", async () => {
    fetchMock.post("http://localhost:3001/auth/signup", 400);
    try {
      await SignUp(signUpFormData);
    } catch (response) {
      expect(response.status).toBe(500);
      expect(response.message).toBe(
        "Unknown error in SignUp.Please see inisde data for more details",
      );
      expect(response.data.status).toBe(400);
    }
  });

  test("unknow error", async () => {
    fetchMock.post("http://localhost:3001/auth/signup", {
      throws: new Error("fetch failed"),
    });
    try {
      await SignUp(signUpFormData);
    } catch (response) {
      expect(response.status).toBe(500);
      expect(response.message).toBe(
        "Unknown error in SignUp.Please see inisde data for more details",
      );
      expect(response.data.message).toBe("fetch failed");
    }
  });
});
