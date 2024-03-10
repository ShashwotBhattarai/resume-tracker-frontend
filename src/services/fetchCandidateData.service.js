import axios from "axios";
import { jwtDecode } from "jwt-decode";
export async function fetchAllCandidateData(authToken) {
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

export async function fetchOneCandidateData(authToken) {
  try {
    const decoded = jwtDecode(authToken);
    const user_id = decoded.user_id;
    const response = await axios.get(
      `http://localhost:4000/getCandidateInfo/${user_id}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      },
    );
    const candidates = response.data.candidate;
    const url = response.data.url;
    return {
      status: 200,
      message: "Candidate data fetched successfully",
      data: { candidates: candidates, url: url },
    };
  } catch (error) {
    return {
      status: 500,
    };
  }
}
