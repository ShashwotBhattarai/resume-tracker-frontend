import axios from "axios";
export async function uploadCandidateInfo(formData, token) {
	try {
		const response = await axios.post("http://localhost:4000/candidate/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.status === 200) {
			return {
				status: 200,
				message: "Candidate info uploaded successfully",
			};
		} else {
			throw new Error("Error: " + response.status);
		}
	} catch (error) {
		throw new Error("error in uploadCandidateInfo", error.message);
	}
}
