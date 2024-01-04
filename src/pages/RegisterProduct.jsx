import AdminSidebar from "../components/AdminSidebar";
import ProductFormCard from "../components/ProductFormCard";
import { strings } from "../localization";

const RegisterProduct = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <ProductFormCard />
                </div>
            </div>
        </div>
    );
}

export default RegisterProduct;
