import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";


// Get token
const getConfig = () => {

  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

};


// Create Order
export const createOrder = (data) => {

  return axios
    .post(
      BASE_URL,
      data,
      getConfig()
    )
    .then((res) => res.data);

};


// Get Orders
export const getOrders = () => {

  return axios
    .get(
      BASE_URL,
      getConfig()
    )
    .then((res) => res.data);

};


// Get Single Order
export const getOrderById = (id) => {

  return axios
    .get(
      `${BASE_URL}/${id}`,
      getConfig()
    )
    .then((res) => res.data);

};