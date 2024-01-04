import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductStyles.css";
import { useContext } from "react";
import { CartContext } from "../helpers/CartContext";

const ProductItem = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  if (!product) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => addProductToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
