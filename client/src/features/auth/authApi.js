import api from "../../services/api";

export const authApi = {
  login: (payload) => api.post("/auth/login", payload).then((res) => res.data),
  register: (payload) =>
    api.post("/auth/register", payload).then((res) => res.data),
  logout: () => api.post("/auth/logout").then((res) => res.data),
  me: () => api.get("/auth/me").then((res) => res.data),
};
