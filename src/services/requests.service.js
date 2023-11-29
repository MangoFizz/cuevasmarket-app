import axios from "axios";

const API_URL = "http://localhost:8080/api/";

export default class RequestsService {
  static async get(endpoint) {
    return axios.get(API_URL + endpoint).then((response) => {
      return response.data;
    });
  }

  static async post(request, endpoint) {
    return axios.post(API_URL + endpoint, request).then((response) => {
      return response.data;
    });
  }

  static async put(request, endpoint) {
    return axios.put(API_URL + endpoint, request).then((response) => {
      return response.data;
    });
  }

  static async delete(endpoint) {
    return axios.delete(API_URL + endpoint).then((response) => {
      return response.data;
    });
  }
}
