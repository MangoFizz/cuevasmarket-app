import React from "react";
import ProductItem from "./ProductItem";
import ProductsService, { getProducts, searchProducts } from "../services/products.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductStyles.css";

const ProductList = (props) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    searchProducts("", 100, 1)
      .then((response) => {
        console.log(response);
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        alert("Falló la carga de productos.");
        return;
      });
  }, []);

  return (
    <div className="product-list">
      <div className="hero text-center">
        <h4>Nuestros productos</h4>
      </div>
      <div className="container">
        <div className="row">
          {products && products.length ? (
            products.map((product) => (
              <div className="col-md-4" key={product.id}>
                <ProductItem product={product} />
              </div>
            ))
          ) : (
            <div className="col-md-12">
              <span className="text-danger">No se encontraron productos.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
