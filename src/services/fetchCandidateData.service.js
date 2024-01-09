import axios from "axios";
export async function fetchCandidateData(authToken) {
	try {
		const response = await axios.get("http://localhost:3002/recruiter/getCandidateInfo/all", {
			headers: { Authorization: `Bearer ${authToken}` },
		});
		const candidates = response.data;
		return candidates;
	} catch (error) {
		throw new Error("error in fetchCandidateData", error.message);
	}
}
