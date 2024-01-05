import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductStyles.css";

const CartItem = ({ product, removeFromCart }) => {
  if (!product) return null;

  return (
    <div
      className="card card-body mb-3"
      style={{ display: "grid", placeItems: "center" }}
    >
      <div className="row">
        <div className="col-md-12">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Precio: ${product.price} MXN</p>
          <p>Cantidad: {product.quantity || 1}</p>
          <button
            className="btn btn-danger btn-sm float-right"
            onClick={() => removeFromCart(product.id)}
          >
            Quitar del carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
