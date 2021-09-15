import axios from "axios";
const login = (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/login", userData)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err.response));
  });
};
const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/logout")
      .then((response) => resolve(response.data))
      .catch((err) => reject(err.response));
  });
};
const authenticate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/auth/")
      .then((response) => resolve(response.data))
      .catch((err) => reject(err.response));
  });
};
const register = (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/", userData)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err.response));
  });
};
export default { login, logout, authenticate, register };
