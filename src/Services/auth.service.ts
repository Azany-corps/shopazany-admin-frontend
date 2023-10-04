function getBearerToken(): string | null {
  try {
    const token = localStorage.getItem("token");

    if (token !== null) {
      return "Bearer " + token;
    }

    return null;
  } catch (error) {
    // Handle any potential errors, e.g., if localStorage is disabled
    console.error("Error retrieving bearer token:", error);
    return null;
  }
}

export { getBearerToken };