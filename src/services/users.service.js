import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";
import { getLoggedUserToken } from "../helpers/loggedUser";

export const UsersServiceResult = {
    Success: 0,
    ServerError: 1,
    RequestError: 2,
    UnknownError: 3,
    AlreadyExists: 4
}

export async function searchUsers(keyword, maxResults, page) {
    const req = new RequestsHelper(API_URL);
    const response = await req.get(`users/search/${keyword}?maxResults=${maxResults}&page=${page}`, getLoggedUserToken());
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: UsersServiceResult.Success, data: response.data };

        case 500:
            return { result: UsersServiceResult.ServerError };
        
        default:
            return { result: UsersServiceResult.UnknownError };
    }
}

export async function deleteUser(userId) {

}
