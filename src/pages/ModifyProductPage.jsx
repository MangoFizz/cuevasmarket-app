import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ProductFormCard from "../components/ProductFormCard";

const ModifyProduct = () => {
    let { productId } = useParams();
    
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <ProductFormCard productId={productId}/>
                </div>
            </div>
        </div>
    );
}

export default ModifyProduct;
