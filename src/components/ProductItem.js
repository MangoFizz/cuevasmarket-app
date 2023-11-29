import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductStyles.css";

const ProductItem = (props) => {
    const { product } = props;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => props.buyNow(product)}
                >
                    Comprar ahora
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
