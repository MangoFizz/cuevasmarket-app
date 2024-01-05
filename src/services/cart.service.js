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
  return RequestService.getAuth(
    `users/` + getLoggedUser().id + `/paymentmethods/`,
  ).then((response) => {
    return response.data || [];
  });
}

export function getShippingAddresses() {
  return RequestService.getAuth(
    `users/` + getLoggedUser().id + `/shippingaddresses/`,
  ).then((response) => {
    return response.data || [];
  });
}

export function checkout(cart, paymentMethodId, shippingAddressId) {
  let order = {
    userId: getLoggedUser().id,
    paymentMethodId: paymentMethodId,
    shippingAddressId: shippingAddressId,
    orderItems: Object.values(cart).map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity || 1,
      };
    }),
  };
  RequestService.post(order, `orders`).then((response) => {
    return response.data;
  });
}
