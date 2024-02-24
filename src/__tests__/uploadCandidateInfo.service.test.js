import { uploadCandidateInfo } from "../services/uploadCandidateInfo.service";
import axios from "axios";
jest.mock("axios");
const formData = {
  firstName: "test",
  email: "test@gmail.com",
};

describe("Upload candidate info service", () => {
  test("Upload successful", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      message: "upload successfull",
    });
    const response = await uploadCandidateInfo(formData, "mocktoken");
    expect(response.status).toBe(200);
    expect(response.message).toBe("Candidate info uploaded successfully");
  });
  test("Error", async () => {
    axios.post.mockResolvedValue({
      status: 500,
      data: { message: "some error" },
    });
    try {
      await uploadCandidateInfo(formData, "mocktoken");
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.status).toEqual(500);
    }
  });
  test("backend Error", async () => {
    axios.post.mockRejectedValue(new Error("something went wrong"));
    try {
      await uploadCandidateInfo(formData, "mocktoken");
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.status).toEqual(500);
    }
  });
});
