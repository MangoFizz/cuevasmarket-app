import BranchInventoryTableCard from "../components/BranchInventoryTableCard";
import ManagerSidebar from "../components/ManagerSidebar";
import UsersTableCard from "../components/UsersTableCard";

const BranchInventoryManagement = () => {
    return (
        <div className="d-flex adminPanel">
            <ManagerSidebar />
            <div className="mainContainer">
                <div className="content">
                    <BranchInventoryTableCard />
                </div>
            </div>
        </div>
    );
}

export default BranchInventoryManagement;
