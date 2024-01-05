import RequestService from "./requests.service";
import { getLoggedUser } from "../helpers/loggedUser";

export function checkProductStock(product) {
  RequestService.get(`products/${product.id}/stock`).then((response) => {
    return response.data.stock >= product.quantity;
  });
}

export function getPaymentMethods() {
  RequestService.get(
    `users/` + getLoggedUser().id + `/shippingaddresses/`,
  ).then((response) => {
    return response.data || [];
  });
}

export function getShippingAddresses() {
  RequestService.get(
    `users/` + getLoggedUser().id + `/shippingaddresses/`,
  ).then((response) => {
    return response.data || [];
  });
}

export function checkout(cart, paymentMethod, shippingAddress) {
  let order = {
    userId: getLoggedUser().id,
    paymentMethod: paymentMethod,
    shippingAddress: shippingAddress,
    products: cart,
  };
  RequestService.post(`orders/`, order).then((response) => {
    return response.data;
  });
}
