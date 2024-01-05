import RequestService from "./requests.service";
import { getLoggedUser } from "../helpers/loggedUser";

export function checkProductStock(product) {
  return RequestService.get(`products/` + product.id + `/stock`).then(
    (response) => {
      return response.data.stock >= product.quantity;
    },
  );
}

export function getPaymentMethods() {
  return RequestService.get(
    `users/` + getLoggedUser().id + `/paymentmethods/`,
  ).then((response) => {
    return response.data || [];
  });
}

export function getShippingAddresses() {
  return RequestService.get(
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
