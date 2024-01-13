import { uploadCandidateInfo } from "../services/uploadCandidateInfo.service";
import formData from "../testData/formData";
import axios from "axios";
jest.mock("axios");

describe("Upload candidate info service", () => {
	test("Upload successful", async () => {
		axios.post.mockResolvedValue({ status: 200, message: "upload successfull" });
		const response = await uploadCandidateInfo(formData, "mocktoken");
		expect(response.status).toBe(200);
		expect(response.message).toBe("Candidate info uploaded successfully");
	});
	test("Error", async () => {
		axios.post.mockResolvedValue({ status: 500, data: { message: "some error" } });
		try {
			await uploadCandidateInfo(formData, "mocktoken");
		} catch (error) {
			expect(error).toEqual(new Error("unknown error in uploadCandidateInfo service"));
		}
	});
});
