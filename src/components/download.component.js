import React, { useState, useEffect } from "react";
import { downloadCandidateData } from "../services/downloadCandidateCV.service";
import { fetchCandidateData } from "../services/fetchCandidateData.service";

const DownloadComponent = () => {
	const [candidates, setCandidates] = useState([]);
	const authToken = localStorage.getItem("token");

	async function callfetchCandidateData(authToken) {
		const response = await fetchCandidateData(authToken);
		return response.data;
	}
	useEffect(() => {
		callfetchCandidateData(authToken).then((data) => {
			setCandidates(data);
		});
	}, [authToken]);

	const handleDownload = async (user_id) => {
		const selectedCandidate = candidates.find((candidate) => candidate.user_id === user_id);
		const downloadResponse = await downloadCandidateData(selectedCandidate, authToken);
		const downloadUrl = downloadResponse.data;

		window.open(downloadUrl, "_blank");
	};

	return (
		<div>
			<h2>Candidate Information</h2>
			<table>
				<thead>
					<tr>
						<th style={{ fontWeight: "bold", fontSize: "1.2em", padding: "10px" }}>S.N</th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map((candidate, index) => (
						<tr key={candidate.user_id}>
							<td>{index + 1}</td>
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
