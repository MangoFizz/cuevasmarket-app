import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductPage = () => {
  //full page height and width
  return (
    <div className="d-flex" style={{ height: "100vh", width: "100%" }}>
      <Sidebar />
      <ProductList />
    </div>
  );
};

export default ProductPage;
