import axios from "axios";

const BASE_URL = "http://localhost:8080/api/addresses";

const getConfig = () => {

  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

};


// GET all addresses
export const getAddresses = () => {

  return axios
    .get(BASE_URL, getConfig())
    .then((res) => res.data);

};


// ADD address
export const addAddress = (data) => {

  return axios
    .post(BASE_URL, data, getConfig())
    .then((res) => res.data);

};


// UPDATE address
export const updateAddress = (id, data) => {

  return axios
    .put(
      `${BASE_URL}/${id}`,
      data,
      getConfig()
    )
    .then((res) => res.data);

};


// DELETE address
export const deleteAddress = (id) => {

  return axios
    .delete(
      `${BASE_URL}/${id}`,
      getConfig()
    )
    .then((res) => res.data);

};