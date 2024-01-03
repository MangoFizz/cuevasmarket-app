import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import StoreBranchFormCard from "../components/StoreBranchFormCard";

const ModifyStoreBranch = () => {
    let { storeBranchId } = useParams();

    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <StoreBranchFormCard storeBranchId={storeBranchId} />
                </div>
            </div>
        </div>
    );
}

export default ModifyStoreBranch;
