import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home.component";
import SignUpForm from "./signup.component";
import LoginForm from "./login.component";
import UploadComponent from "./upload.component";
import DownloadComponent from "./download.component";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/upload" element={<UploadComponent />} />
        <Route path="/download" element={<DownloadComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
