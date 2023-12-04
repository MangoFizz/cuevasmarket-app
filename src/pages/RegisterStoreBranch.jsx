import AdminSidebar from "../components/AdminSidebar";
import StoreBranchFormCard from "../components/StoreBranchFormCard";

const RegisterStoreBranch = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <StoreBranchFormCard />
                </div>
            </div>
        </div>
    );
}

export default RegisterStoreBranch;
