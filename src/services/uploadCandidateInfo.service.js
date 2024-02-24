import axios from "axios";
export async function uploadCandidateInfo(formData, token) {
  try {
    const response = await axios.post(
      `http://localhost:4000/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return {
        status: 200,
        message: "Candidate info uploaded successfully",
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
