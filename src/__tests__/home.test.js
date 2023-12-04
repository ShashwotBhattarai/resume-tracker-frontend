import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/home.component";

describe("Home component", () => {
	test("renders Home component", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		// Check if the component renders successfully
		expect(screen.getByText("Resume Tracker App")).toBeInTheDocument();
		expect(screen.getByText("Sign Up")).toBeInTheDocument();
		expect(screen.getByText("Login")).toBeInTheDocument();
	});

	test("redirects to /signup on Sign Up button click", async () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		// Use act to wrap the code that interacts with MemoryRouter
		await act(async () => {
			// Click the Sign Up button
			userEvent.click(screen.getByText("Sign Up"));
		});

		// Check if the URL changes to /signup
		expect(screen.getByText("Sign Up").closest("a")).toHaveAttribute("href", "/signup");
	});

	test("redirects to /login on Login button click", async () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		// Use act to wrap the code that interacts with MemoryRouter
		await act(async () => {
			// Click the Login button
			userEvent.click(screen.getByText("Login"));
		});

		// Check if the URL changes to /login
		expect(screen.getByText("Login").closest("a")).toHaveAttribute("href", "/login");
	});
});
