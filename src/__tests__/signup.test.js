import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpForm from "../components/signup.component";
import { MemoryRouter } from "react-router";

// Mock the fetch function to simulate API requests
beforeAll(() => {
	jest.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({}) });
});

afterAll(() => {
	global.fetch.mockRestore();
});

test("renders SignUpForm component", () => {
	render(
		<MemoryRouter>
			<SignUpForm />
		</MemoryRouter>
	);
	expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
	expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});

test("submits the form with valid data", async () => {
	render(
		<MemoryRouter>
			<SignUpForm />
		</MemoryRouter>
	);

	// Fill out the form
	fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpassword" } });
	fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
	fireEvent.change(screen.getByLabelText(/role/i), { target: { value: "candidate" } });

	// Submit the form
	fireEvent.click(screen.getByText(/Sign Up/i));

	// Ensure the fetch function was called with the correct data
	await waitFor(() => {
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "testuser",
				password: "testpassword",
				email: "test@example.com",
				role: "candidate",
			}),
		});
	});

	fireEvent.click(screen.getByText(/Sign Up/i));

	// Ensure success message is displayed
	await screen.findByText(/User sign up successful/i);
});

test("handles form submission error", async () => {
	// Mock fetch to simulate an error response
	global.fetch.mockResolvedValueOnce({ ok: false });

	render(
		<MemoryRouter>
			<SignUpForm />
		</MemoryRouter>
	);

	// Submit the form
	fireEvent.click(screen.getByText(/Sign Up/i));

	// Ensure the fetch function was called with the correct data
	await waitFor(() => {
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "",
				password: "",
				email: "",
				role: "",
			}),
		});
	});

	// Ensure error message is displayed
	expect(await screen.findByText(/Error signing up user/i)).toBeInTheDocument();
});

// Add more tests as needed to achieve 90% coverage
