import axios from "axios";
export async function uploadCandidateInfo(formData, token) {
  try {
    if (formData.cv !== null) {
      console.log("inside if");
      const key = Date.now() + "_" + formData.cv.name;
      const urlResponse = await axios.get("http://localhost:4000/uploadURL", {
        headers: { Authorization: `Bearer ${token}`, key: key },
      });

      const url = urlResponse.data.url;

      const s3uploadResponse = await axios.put(url, formData.cv, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = {
        fullname: formData.fullname,
        email: formData.email,
        phone_number: formData.phone_number,
      };
      const response = await axios.post(`http://localhost:4000/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          newkey: key,
        },
      });
      if (s3uploadResponse.status === 200 && response.status === 200) {
        return {
          status: 200,
          message: "Candidate info uploaded successfully",
        };
      } else {
        return {
          status: 500,
        };
      }
    } else {
      const data = {
        fullname: formData.fullname,
        email: formData.email,
        phone_number: formData.phone_number,
      };
      const response = await axios.post(`http://localhost:4000/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          newkey: null,
        },
      });
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
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
}
