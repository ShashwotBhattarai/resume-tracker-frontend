import axios from "axios";
export async function downloadCandidateData(selectedCandidate, authToken) {
  try {
    const awsFileKey = selectedCandidate.aws_file_key;

    const downloadResponse = await axios.post(
      `http://localhost:3002/recruiter/download`,
      { key: awsFileKey },
      { headers: { Authorization: `Bearer ${authToken}` } },
    );

    const downloadUrl = downloadResponse.data.url;

    return {
      status: 200,
      message: "Candidate data downloaded successfully",
      data: downloadUrl,
    };
  } catch (error) {
    throw new Error("unknown error in downloadCandidateData service");
  }
}
