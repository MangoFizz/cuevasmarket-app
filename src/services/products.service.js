import RequestsService from "./requests.service";

export default class ProductsService {
  static async getProducts() {
    return RequestsService.get("products");
  }

  static async getProduct(id) {
    return RequestsService.get(`products/${id}`);
  }

  static async createProduct(product) {
    return RequestsService.post(product, "products");
  }
}
