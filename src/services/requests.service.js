const API_URL = "http://localhost:2000/";

export default class RequestsService {
  static async get(endpoint) {
    const response = await fetch(API_URL + endpoint);
    const data = await response.json();
    return data;
  }

  static async post(request, endpoint) {
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    return data;
  }

  static async put(request, endpoint) {
    const response = await fetch(API_URL + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    return data;
  }

  static async delete(endpoint) {
    const response = await fetch(API_URL + endpoint, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
}
