import { API_URL } from "../config";
import RequestsHelper from "../helpers/RequestsHelper";
import { getLoggedUserToken } from "../helpers/loggedUser";
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

export async function searchProductsStock(storeBranchId, keyword, maxResults, page) {
    const req = new RequestsHelper(API_URL);
    const response = await req.get(`storebranches/${storeBranchId}/productstock/search/${keyword}?maxResults=${maxResults}&page=${page}`);
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

export async function registerProduct(barcode, name, description, price, provider, category, image) {
    const productData = {
        barcode, 
        name, 
        description, 
        price: parseFloat(price), 
        provider, 
        category, 
        image
    };
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("productData", JSON.stringify(productData));

    const response = await fetch(API_URL + "products", {
        method: "POST",
        headers: {
            "authorization": `${getLoggedUserToken()}`
        },
        body: formData,
    });
    const responseData = await response.json();
    let status = responseData.statusCode;
    switch(status) {
        case 201:
            return { result: ProductsServiceResult.Success, data: responseData.data };

        case 500:
            return { result: ProductsServiceResult.ServerError };
        
        case 400:
            return { result: ProductsServiceResult.RequestError, data: responseData.data };

        case 409:
            return { result: ProductsServiceResult.AlreadyExists };
        
        default:
            return { result: ProductsServiceResult.UnknownError };
    }
}

export async function getProduct(productId) {
    const req = new RequestsHelper(API_URL);
    const response = await req.get(`products/${productId}`);
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

export async function updateProduct(productId, barcode, name, description, price, provider, category, image) {
    const req = new RequestsHelper(API_URL);
    const response = await req.put(`products/${productId}`, {
        barcode, 
        name, 
        description, 
        price: parseFloat(price), 
        provider, 
        category, 
        image
    }, getLoggedUserToken());
    let status = response.statusCode;
    switch(status) {
        case 204:
            return { result: ProductsServiceResult.Success, data: response.data };

        case 500:
            return { result: ProductsServiceResult.ServerError };
        
        default:
            return { result: ProductsServiceResult.UnknownError };
    }
}

export async function deleteProduct(productId) {
    const req = new RequestsHelper(API_URL);
    const response = await req.delete(`products/${productId}`, getLoggedUserToken());
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

export async function addProductStock(productId, storeBranchId, quantity) {
    const req = new RequestsHelper(API_URL);
    const response = await req.put(`storebranches/${storeBranchId}/productstock/${productId}`, {
        quantity: parseInt(quantity)
    }, getLoggedUserToken());
    let status = response.statusCode;
    switch(status) {
        case 200:
            return { result: ProductsServiceResult.Success, data: response.data };

        case 500:
            return { result: ProductsServiceResult.ServerError };

        case 400:
            return { result: ProductsServiceResult.RequestError, data: response.data };
        
        default:
            return { result: ProductsServiceResult.UnknownError };
    }
}

export async function getProducts() {
    return RequestsService.get("products/search/");
  }
