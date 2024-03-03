import { uploadCandidateInfo } from "../services/uploadCandidateInfo.service"; // Adjust the import path as necessary
import mockAxios from "jest-mock-axios"; // This package is used to mock axios calls

// Clear all mocks before each test
beforeEach(() => {
  mockAxios.reset();
});

describe("uploadCandidateInfo", () => {
  const formData = {
    fullname: "John Doe",
    email: "john.doe@example.com",
    phone_number: "1234567890",
    cv: new File(["cv-content"], "cv.doc"), // Mock a File object
  };
  const token = "fake-token";

  it("successfully uploads candidate info", async () => {
    // Mock responses for the axios calls
    mockAxios.get.mockResolvedValueOnce({
      data: { url: "https://mock-s3-url.com" },
    });
    mockAxios.put.mockResolvedValueOnce({ status: 200 });
    mockAxios.post.mockResolvedValueOnce({ status: 200 });

    const response = await uploadCandidateInfo(formData, token);

    // Check if the correct axios calls were made
    expect(mockAxios.get).toHaveBeenCalledWith(
      "http://localhost:4000/uploadURL",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          key: expect.stringContaining(formData.cv.name),
        },
      },
    );
    expect(mockAxios.put).toHaveBeenCalledWith(
      "https://mock-s3-url.com",
      formData.cv,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:4000/upload",
      {
        fullname: formData.fullname,
        email: formData.email,
        phone_number: formData.phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          newkey: expect.stringContaining(formData.cv.name),
        },
      },
    );

    // Check the response
    expect(response).toEqual({
      status: 200,
      message: "Candidate info uploaded successfully",
    });
  });

  it("handles failure in getting upload URL", async () => {
    // Mock a failed get request
    mockAxios.get.mockRejectedValueOnce(new Error("Failed to get upload URL"));

    const response = await uploadCandidateInfo(formData, token);

    expect(response).toEqual({
      status: 500,
    });
  });

  it("testing else block", async () => {
    // Mock responses for the axios calls
    mockAxios.get.mockResolvedValueOnce({
      data: { url: "https://mock-s3-url.com" },
    });
    mockAxios.put.mockResolvedValueOnce({ status: 500 });
    mockAxios.post.mockResolvedValueOnce({ status: 200 });

    const response = await uploadCandidateInfo(formData, token);
    // Check the response
    expect(response).toEqual({
      status: 500,
    });
  });

  // Add more tests for other scenarios, like failure in S3 upload, failure in posting candidate details, etc.
});
