export const authFetch = async (url, options = {}) => {
  // Get stored auth object
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth).token : "";

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response, data;
  try {
    response = await fetch(url, { ...options, headers });

    try {
      data = await response.json(); // Might fail if response is empty or HTML
    } catch {
      data = {}; // fallback to empty object
    }

    return { status: response.status, data };
  } catch (err) {
    console.error("authFetch error:", err);
    return { status: 0, data: { message: "Network or CORS error" } };
  }
};
