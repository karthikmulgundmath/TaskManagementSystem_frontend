import axios from "axios";
const authToken = localStorage.getItem("authToken");
const setheaders = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const Login = (path, payload) => {
  return axios.post(path, payload, {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
};
const postDetails = (path, payload) => {
  return axios.post(path, payload, {
    headers: setheaders,
  });
};

const updateDetails = (path, payload) => {
  return axios.put(path, payload, {
    headers: setheaders,
  });
};

const deleteDetails = (path) => {
  return axios.delete(path, {
    headers: setheaders,
  });
};

const getDetails = (path) => {
  return axios.get(path, {
    headers: setheaders,
  });
};

export const APICalls = {
  Login,
  postDetails,
  updateDetails,
  deleteDetails,
  getDetails,
};
