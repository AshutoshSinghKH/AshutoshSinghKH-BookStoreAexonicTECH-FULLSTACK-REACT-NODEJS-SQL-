import axios from "axios";

const BASE_URL = "http://localhost:8080/api/books";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBooks = () => {
  return axios
    .get(BASE_URL, getConfig())
    .then((res) => res.data);
};

export const getBookById = (id) => {
  return axios
    .get(`${BASE_URL}/${id}`, getConfig())
    .then((res) => res.data);
};