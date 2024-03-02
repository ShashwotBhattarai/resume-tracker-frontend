export async function SignUp(formData) {
  try {
    const response = await fetch(`http://localhost:3001/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: formData.username,
        password: formData.password,
      },
      body: JSON.stringify({ email: formData.email, role: formData.role }),
    });
    if (response.status === 201) {
      return {
        status: 200,
        message: "User sign up successfull",
        data: null,
      };
    } else {
      return {
        status: response.status,
        message: response.message,
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
}
