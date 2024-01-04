import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";
import RequestsService from "./requests.service";

export const ProductsServiceResult = {
    Success: 0,
    ServerError: 1,
    RequestError: 2,
    UnknownError: 3,
    AlreadyExists: 4
}

export async function searchProducts(keyword, maxResults, page) {
    const req = new RequestsHelper(API_URL);
    const response = await req.get(`products/search/${keyword}?maxResults=${maxResults}&page=${page}`);
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: ProductsServiceResult.Success, data: response.data };

        case 500:
            return { result: ProductsServiceResult.ServerError };
        
        default:
            return { result: ProductsServiceResult.UnknownError };
    }
}
