import { useContext } from "react";
import { CartContext } from "../helpers/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cart, removeProductFromCart, updateQuantity } =
    useContext(CartContext);

  const cartItems = Object.values(cart);

  return (
    <button className="btn btn-primary btn-sm" style={{ margin: "10px" }}>
      <i className="bi bi-cart"></i>
      <span className="badge bg-secondary">{cartItems.length}</span>
    </button>
  );
};

export default Cart;
