import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + "login", {
                username: user.username,
                password: user.password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
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
