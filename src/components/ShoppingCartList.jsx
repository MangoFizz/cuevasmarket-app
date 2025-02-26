import CartItem from "./CartItem";
import React, { useContext, useEffect, useState } from "react";
import { getLoggedUser } from "../helpers/loggedUser";
import { CartContext } from "../helpers/CartContext";
import {
  checkProductStock,
  getPaymentMethods,
  getShippingAddresses,
  checkout,
} from "../services/cart.service";
import "bootstrap/dist/css/bootstrap.min.css";

const ShoppingCartList = () => {
  const { cart, removeProductFromCart } = useContext(CartContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useEffect(() => {
    console.log(getLoggedUser());
    if (getLoggedUser() === null) {
      window.location.href = "/login";
    }
    getPaymentMethods().then(setPaymentMethods);
    getShippingAddresses().then(setShippingAddresses);
  }, []);

  const clearCart = () => {
    for (let i = 0; i < Object.values(cart).length; i++) {
      removeProductFromCart(Object.values(cart)[i].id);
    }
  };

  const checkCheckoutConditions = () => {
    if (Object.values(cart).length === 0) {
      return false;
      //} else {
      //    for (let i = 0; i < cartItems.length; i++) {
      //  if (!checkProductStock(cartItems[i])) {
      //    return false;
      //  }
      //}
    }

    if (paymentMethods.length === 0) {
      return false;
    }

    if (shippingAddresses.length === 0) {
      return false;
    }

    return true;
  };

  const handleCheckout = () => {
    if (checkCheckoutConditions()) {
      checkout(cart, paymentMethods[0].id, shippingAddresses[0].id);
    }
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "20px",
        height: "100vh",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Artículos en el carrito</h3>
          {Object.values(cart).map((product) => (
            <CartItem
              product={product}
              removeFromCart={removeProductFromCart}
            />
          ))}
          <button className="btn btn-danger btn-sm" onClick={clearCart}>
            Limpiar carrito
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12" style={{ marginTop: "40px" }}>
          <h3 className="text-center">Método de Pago</h3>
          <select className="form-control">
            {paymentMethods.map((paymentMethod) => (
              <option value={paymentMethod.id}>
                {paymentMethod.cardNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12" style={{ marginTop: "20px" }}>
          <h3 className="text-center">Dirección de Envío</h3>
          <select className="form-control">
            {shippingAddresses.map((shippingAddress) => (
              <option value={shippingAddress.id}>
                {shippingAddress.streetAddress}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12">
          <button
            className="btn btn-success btn-sm"
            style={{ marginTop: "20px" }}
            onClick={handleCheckout}
            disabled={!checkCheckoutConditions()}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartList;
