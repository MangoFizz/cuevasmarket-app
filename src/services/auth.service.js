import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";
import { getLoggedUserToken } from "../helpers/loggedUser";

export const UserAuthResult = {
    InvalidCredentials: 0,
    Success: 1,
    TooManyAttempts: 2,
    ServerError: 3,
    UnknownError: 4,
    InvalidToken: 5,
    AlreadyExists: 6,
}

export async function authUser(username, password) {
    const req = new RequestsHelper(API_URL);
    const response = await req.post("auth/login", { username, password });
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

export async function registerCustomer(firstName, surnames, phoneNumber, password) {
    const req = new RequestsHelper(API_URL);
    const response = await req.post("auth/register", { firstName, surnames, phoneNumber, password });
    let status = response.statusCode;
    switch(status) {
        case 201:
            return { result: UserAuthResult.Success };

        case 400:
            return { result: UserAuthResult.RequestError };
        
        case 500:
            return { result: UserAuthResult.ServerError };
        
        case 409:
            return { result: UserAuthResult.AlreadyExists };

        default:
            return { result: UserAuthResult.UnknownError };
    }
}
