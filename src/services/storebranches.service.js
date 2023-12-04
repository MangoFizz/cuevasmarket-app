import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";

export const StoreBranchesSearchResult = {
    Success: 0,
    ServerError: 1,
    UnknownError: 2
}

export async function searchStoreBranches(keyword, maxResults, page) {
    const req = new RequestsHelper(API_URL);
    const response = await req.get(`storebranches/search/${keyword}?maxResults=${maxResults}&page=${page}`);
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: StoreBranchesSearchResult.Success, data: response.data };

        case 500:
            return { result: StoreBranchesSearchResult.ServerError };
        
        default:
            return { result: StoreBranchesSearchResult.UnknownError };
    }
}
