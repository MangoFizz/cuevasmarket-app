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
  const { cart, setCart } = useContext(CartContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useEffect(() => {
    getPaymentMethods().then(setPaymentMethods);
    getShippingAddresses().then(setShippingAddresses);
  }, []);

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkCheckoutConditions = () => {
    if (cart.length === 0) {
      return false;
    }
    for (let i = 0; i < cart.length; i++) {
      if (!checkProductStock(cart[i])) {
        return false;
      }
    }
    return true;
  };

  const handleCheckout = (paymentMethod, shippingAddress) => {
    if (checkCheckoutConditions()) {
      checkout(cart, paymentMethod, shippingAddress);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20px", height: "100vh" }}>
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center">Shopping Cart</h3>
          {Object.values(cart).map((product) => (
            <CartItem product={product} removeFromCart={removeFromCart} />
          ))}
          ))}
          <button
            className="btn btn-danger btn-sm float-right"
            onClick={clearCart}
          >
            Limpiar carrito
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center">Payment Method</h3>
          <select className="form-control">
            {paymentMethods.map((paymentMethod) => (
              <option>{paymentMethod.cardNumber}</option>
            ))}
          </select>
        </div>
        <div className="col-md-8">
          <h3 className="text-center">Shipping Address</h3>
          <select className="form-control">
            {shippingAddresses.map((shippingAddress) => (
              <option>{shippingAddress.streetName}</option>
            ))}
          </select>
        </div>
        <div className="col-md-8">
          <button
            className="btn btn-success btn-sm float-right"
            onClick={handleCheckout()}
            disabled={!checkCheckoutConditions()}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartList;
