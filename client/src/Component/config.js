import axios from "axios";

export const apiUrl = `http://localhost:9000/api/v1`;

export const instance = axios.create({
  baseURL: apiUrl,
});
