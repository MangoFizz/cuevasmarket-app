import RequestsService from "./requests.service";

class AuthService {
  login(user) {
    return RequestsService.post(user, "login").then((response) => {
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
