import { fetchCandidateData } from "../services/fetchCandidateData.service";
import axios from "axios";
jest.mock("axios");

describe("Fetch candidateinfo service", () => {
  test("Fetch successful", async () => {
    axios.get.mockResolvedValue({ status: 200, message: "fetch successfull" });
    const response = await fetchCandidateData("mocktoken");
    expect(response.status).toBe(200);
    expect(response.message).toBe("Candidate data fetched successfully");
  });
  test("unknown error", async () => {
    axios.get.mockRejectedValue(new Error("some unkown error"));
    try {
      await fetchCandidateData("mocktoken");
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toEqual(
        new Error("unknown error in fetchCandidateData service"),
      );
    }
  });
});
