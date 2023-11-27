import React, { useState, useEffect } from "react";
import axios from "axios";

const DownloadComponent = () => {
	const [candidates, setCandidates] = useState([]);
	const authToken = localStorage.getItem("token"); // Extract token from localStorage

	useEffect(() => {
		// Fetch all candidates information
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3002/getCandidateInfo/all", {
					headers: { Authorization: `Bearer ${authToken}` },
				});
				setCandidates(response.data);
			} catch (error) {
				console.error("Error fetching candidate information:", error);
			}
		};

		fetchData();
	}, [authToken]);

	const handleDownload = async (user_id) => {
		try {
			// Find the candidate in the array
			const selectedCandidate = candidates.find((candidate) => candidate.user_id === user_id);

			if (selectedCandidate) {
				// Retrieve the aws_file_key
				const awsFileKey = selectedCandidate.aws_file_key;

				// Make the download API call with authentication token in headers
				const downloadResponse = await axios.post(
					"http://localhost:3002/test-download",
					{ key: awsFileKey },
					{ headers: { Authorization: `Bearer ${authToken}` } }
				);

				// Perform actions with the downloaded data if needed
				console.log("Downloaded data:", downloadResponse.data);
				const downloadUrl = downloadResponse.data.url;

				// Open the URL in a new tab
				window.open(downloadUrl, "_blank");
			} else {
				console.error("Candidate not found in the array.");
			}
		} catch (error) {
			console.error("Error downloading candidate information:", error);
		}
	};

	return (
		<div>
			<h2>Candidate Information</h2>
			<table>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map((candidate) => (
						<tr key={candidate.user_id}>
							<td>{candidate.user_id}</td>
							<td>{candidate.fullname}</td>
							<td>{candidate.email}</td>
							<td>
								<button onClick={() => handleDownload(candidate.user_id)}>
									Download
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DownloadComponent;
