import React from "react";
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { strings } from "../localization";
import { getLoggedUser, getLoggedUserName, isUserLogged, setLoggedUser } from '../helpers/loggedUser';
import { Button } from "react-bootstrap";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleSignOutButtonClick = () => {
        setLoggedUser(null);
        navigate("/");
    }

    return (
        <CDBSidebar className="sidebar-fixed vh-100" backgroundColor="#fff" textColor="#000">
            <CDBSidebarHeader>
                <div className="d-flex align-items-center">
                    <img src={'/images/logo.png'} alt="" style={{ width: '30px' }}/>
                    <h6 style={{ marginBottom: "0", marginLeft: "0.4rem" }}>Abarrotes Cuevas</h6>
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <NavLink exact to="/admin/sucursales" activeClassName="activeClicked" style={{ color: "inherit" }}>
                        <CDBSidebarMenuItem icon="table">
                            {strings.adminSidebar.storeBranches}
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/admin/pedidos" activeClassName="activeClicked" style={{ color: "inherit" }}>
                        <CDBSidebarMenuItem icon="archive">
                            {strings.adminSidebar.products}
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/admin/usuarios" activeClassName="activeClicked" style={{ color: "inherit" }}>
                        <CDBSidebarMenuItem icon="users">
                            {strings.adminSidebar.users}
                        </CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: "center" }}>
                <Button variant="outline-danger" size="md" className="mb-3" onClick={handleSignOutButtonClick}>
                    <div className="d-flex align-items-center justify-content-center">
                        <i class="bi bi-box-arrow-left" style={{ marginRight: "0.4rem" }}></i>
                        {strings.adminSidebar.signOut}
                    </div>
                </Button>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
};

export default AdminSidebar;
