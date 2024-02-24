import axios from "axios";
export async function fetchCandidateData(authToken) {
  try {
    const response = await axios.get(
      `http://localhost:3002/recruiter/getCandidateInfo/all`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    const candidates = response.data;
    return {
      status: 200,
      message: "Candidate data fetched successfully",
      data: candidates,
    };
  } catch (error) {
    throw new Error("unknown error in fetchCandidateData service");
  }
}
