import AdminSidebar from "../components/AdminSidebar";
import UsersTableCard from "../components/UsersTableCard";

const UsersManagement = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <UsersTableCard />
                </div>
            </div>
        </div>
    );
}

export default UsersManagement;
