import AdminSidebar from "../components/AdminSidebar";
import ProductFormCard from "../components/ProductFormCard";
import UserFormCard from "../components/UserFormCard";
import { strings } from "../localization";

const RegisterUser = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <UserFormCard />
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;
