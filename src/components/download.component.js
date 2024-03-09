import React, { useState, useEffect } from "react";
import { downloadCandidateData } from "../services/downloadCandidateCV.service";
import { fetchCandidateData } from "../services/fetchCandidateData.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DownloadComponent = () => {
  const [candidates, setCandidates] = useState([]);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

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
    const selectedCandidate = candidates.find(
      (candidate) => candidate.user_id === user_id,
    );

    try {
      const downloadResponse = await downloadCandidateData(
        selectedCandidate,
        authToken,
      );
      const downloadUrl = downloadResponse.data;
      window.open(downloadUrl, "_blank");
    } catch {
      toast.error("Download failed please try again after some time");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Candidate Information
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-start mt-4"
          >
            Logout
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  S.N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {candidates.map((candidate, index) => (
                <tr key={candidate.user_id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {candidate.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {candidate.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDownload(candidate.user_id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownloadComponent;
