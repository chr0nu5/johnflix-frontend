const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function Api() {
  let token = localStorage.getItem("token");

  const saveToken = (newToken) => {
    token = newToken;
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    token = null;
    localStorage.removeItem("token");
  };

  const getHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
      }
      return {};
    }
    return response.json();
  };

  const login = async (username, password) => {
    return fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    })
      .then(handleResponse)
      .then((data) => {
        if (data.access) {
          saveToken(data.access);
        }
        return data;
      });
  };

  const getProfile = async () => {
    return fetch(`${API_URL}/user/profile/`, {
      method: "GET",
      headers: getHeaders(),
    }).then(handleResponse);
  };

  const logout = () => {
    removeToken();
  };

  return {
    login,
    getProfile,
    logout,
  };
}