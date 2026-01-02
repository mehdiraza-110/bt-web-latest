// api.ts
import axios from "axios";

const baseURL= `${process.env.NEXT_PUBLIC_API_URL}`
console.log("BASE_URL:", baseURL);

const API = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getAllData = async (endpoint: string) => {
  try {
    const response = await API.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("GET all request failed:", error);
    throw error;
  }
};
// GET by ID
export const getDataById = async (endpoint: string, id: string | number) => {
  try {
    const response = await API.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("GET by ID request failed:", error);
    throw error;
  }
};

type QueryParams = Record<string, string | number | undefined>;

export const getAllDataWithFilter = async (
  endpoint: string,
  params: QueryParams = {}
) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.append(key, String(value));
      }
    });

    const url = query.toString()
      ? `${endpoint}?${query.toString()}`
      : endpoint;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("GET all request failed:", error);
    throw error;
  }
};

