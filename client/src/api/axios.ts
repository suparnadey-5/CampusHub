import axios from "axios";

// ---------------------------------------------------------------------------
// Axios Singleton
// ---------------------------------------------------------------------------
// One instance for the entire app.
// All API calls import from here — never call axios.create() elsewhere.
// ---------------------------------------------------------------------------

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// Request Interceptor — attach JWT automatically
// ---------------------------------------------------------------------------
// Every outgoing request checks localStorage for a token.
// If found, it's attached as: Authorization: Bearer <token>
// This means NO individual API call needs to manually set the header.
// ---------------------------------------------------------------------------

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Response Interceptor — global error handling
// ---------------------------------------------------------------------------
// 401 Unauthorized → token expired or invalid → clear storage, redirect login
// All other errors are passed through so individual callers can handle them.
// ---------------------------------------------------------------------------

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired — force logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login without React Router (interceptor has no hook access)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;