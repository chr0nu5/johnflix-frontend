const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function Api() {
  let token = localStorage.getItem("token");
  let refreshToken = localStorage.getItem("refresh");
  let hidden = localStorage.getItem("hidden");

  if (hidden === "true") {
    hidden = "true";
  } else {
    hidden = "false";
  }

  const saveTokens = (newToken, newRefreshToken) => {
    if (newToken) {
      token = newToken;
      localStorage.setItem("token", newToken);
    }
    if (newRefreshToken) {
      refreshToken = newRefreshToken;
      localStorage.setItem("refresh", newRefreshToken);
    }
  };

  const removeTokens = () => {
    token = null;
    refreshToken = null;
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  };

  const getHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const handleResponse = async (response, originalRequest) => {
    if (response.status === 401 && refreshToken) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return fetch(originalRequest.url, {
          ...originalRequest,
          headers: getHeaders(),
        }).then(handleResponse);
      } else {
        removeTokens();
      }
    }
    if (!response.ok) {
      return {};
    }
    return response.json();
  };

  const refreshAccessToken = async () => {
    const response = await fetch(`${API_URL}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      removeTokens();
      return false;
    }

    const data = await response.json();
    if (data.access) {
      saveTokens(data.access);
      return true;
    }

    return false;
  };

  const login = async (username, password) => {
    return fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    })
      .then((response) =>
        handleResponse(response, { url: `${API_URL}/auth/login/` })
      )
      .then((data) => {
        if (data.access && data.refresh) {
          saveTokens(data.access, data.refresh);
        }
        return data;
      });
  };

  const getProfile = async () => {
    return fetch(`${API_URL}/user/profile/`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/user/profile/`,
        method: "GET",
      })
    );
  };

  const getRecommended = async () => {
    return fetch(`${API_URL}/recommended/?hidden=${hidden}&limit=8`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/recommended/?hidden=${hidden}&limit=8`,
        method: "GET",
      })
    );
  };

  const getLatestMovies = async () => {
    return fetch(
      `${API_URL}/movies/?hidden=${hidden}&limit=8&order_by=created_date&order_direction=desc`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    ).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/movies/?hidden=${hidden}&limit=8&order_by=created_date&order_direction=desc`,
        method: "GET",
      })
    );
  };

  const getMovies = async () => {
    return fetch(`${API_URL}/movies/?hidden=${hidden}&limit=8`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/movies/?hidden=${hidden}&limit=8`,
        method: "GET",
      })
    );
  };

  const getMovie = async (hash) => {
    return fetch(`${API_URL}/movies/?hash=${hash}`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/movies/?hash=${hash}`,
        method: "GET",
      })
    );
  };

  const getSubtitle = async (url) => {
    return fetch(url, {
      method: "GET",
    }).then((response) => {
      return response.text();
    });
  };

  const getUserWatchlist = async () => {
    return fetch(`${API_URL}/user/watchlist/?hidden=${hidden}`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/user/watchlist/?hidden=${hidden}`,
        method: "GET",
      })
    );
  };

  const getUserWatchinglist = async () => {
    return fetch(`${API_URL}/user/watching/?hidden=${hidden}`, {
      method: "GET",
      headers: getHeaders(),
    }).then((response) =>
      handleResponse(response, {
        url: `${API_URL}/user/watching/?hidden=${hidden}`,
        method: "GET",
      })
    );
  };

  const logout = () => {
    removeTokens();
  };

  return {
    getLatestMovies,
    getMovies,

    getRecommended,

    getMovie,
    getSubtitle,

    getProfile,
    getUserWatchlist,
    getUserWatchinglist,

    login,
    logout,
  };
}
