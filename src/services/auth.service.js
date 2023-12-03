import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";
import { getLoggedUserToken } from "../helpers/loggedUser";

export const UserAuthResult = {
    InvalidCredentials: 0,
    Success: 1,
    TooManyAttempts: 2,
    ServerError: 3,
    UnknownError: 4,
    InvalidToken: 5
}

export async function authUser(email, password) {
    const req = new RequestsHelper(API_URL);
    const response = await req.post("auth/login", { email, password });
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: UserAuthResult.Success, data: response.data };

        case 401:
            return { result: UserAuthResult.InvalidCredentials };

        case 500:
            return { result: UserAuthResult.ServerError };
        
        default:
            return { result: UserAuthResult.UnknownError };
    }
}

export async function verifyUserAuth() {
    const req = new RequestsHelper(API_URL);
    const response = await req.get("auth/verify", getLoggedUserToken());
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: UserAuthResult.Success };

        case 401:
            return { result: UserAuthResult.InvalidToken };

        default:
            return { result: UserAuthResult.UnknownError };
    }
}
