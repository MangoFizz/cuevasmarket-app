import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import UserFormCard from "../components/UserFormCard";

const ModifyUser = () => {
    let { userId } = useParams();

    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <UserFormCard userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default ModifyUser;
