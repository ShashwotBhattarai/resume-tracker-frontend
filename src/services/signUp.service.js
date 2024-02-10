export async function SignUp(formData) {
	try {

		const response = await fetch(`http://localhost:3001/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		console.log("response", response);
		if (response.status === 201) {
			return {
				status: 200,
				message: "User sign up successfull",
				data: null,
			};
		} else {
			const err = new Error("Error: " + response.message);
			err.status = response.status;

			err.data = null;

			throw err;
		}
	} catch (error) {
		const err = new Error("Unknown error in SignUp.Please see inisde data for more details");
		err.status = 500;
		err.data = error;

		throw err;
	}
}
