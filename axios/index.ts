import axios from "axios";

export const baseURL = "https://green-it-server.onrender.com/api/v1";

export const productsFetch = axios.create({
  baseURL: baseURL + "/products",
});

export const ordersApi = axios.create({
  baseURL: baseURL + "/orders",
});
export const authApi = axios.create({
  baseURL: baseURL + "/orders",
});
