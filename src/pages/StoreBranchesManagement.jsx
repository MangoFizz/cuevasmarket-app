import AdminSidebar from "../components/AdminSidebar";
import StoreBranchesList from "../components/StoreBranchesList";
import { strings } from "../localization";

const StoreBranchesManagement = () => {
    return (
        <div className="d-flex adminPanel">
            <AdminSidebar />
            <div className="mainContainer">
                <div className="content">
                    <h3>{strings.storeBranchesManagement.header}</h3>
                    <StoreBranchesList />
                </div>
            </div>
        </div>
    );
}

export default StoreBranchesManagement;
