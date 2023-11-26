import React from "react";
import ProductItem from "./ProductItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductStyles.css";

const ProductList = (props) => {
    const { products } = props;

    return (
        <div className="product-list">
            <div className="hero text-center">
                <h4>Nuestros productos</h4>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {products && products.length ? (
                            products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    buyNow={props.buyNow}
                                />
                            ))
                        ) : (
                            <div className="col-md-12">
                                <span className="text-danger">
                                    No se encontraron productos.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
