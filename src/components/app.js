// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home.component";
import SignUpForm from "./signup.component";
import LoginForm from "./login.component";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUpForm />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
