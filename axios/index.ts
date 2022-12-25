import axios from "axios";

export const baseURL = "http://localhost:5000/api/v1";

export const productsFetch = axios.create({
  baseURL: baseURL + "/products",
});

export const ordersApi = axios.create({
  baseURL: baseURL + "/orders",
});
export const authApi = axios.create({
  baseURL: baseURL + "/orders",
});
