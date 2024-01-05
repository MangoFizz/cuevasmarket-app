import AdminSidebar from "../components/AdminSidebar";
import ProductsTableCard from "../components/ProductsTableCard";
import { strings } from "../localization";

const ProductsManagement = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <h3>{strings.productManagement.header}</h3>
                    <ProductsTableCard />
                </div>
            </div>
        </div>
    );
}

export default ProductsManagement;
