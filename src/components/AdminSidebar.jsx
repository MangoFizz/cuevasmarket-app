import React from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { strings } from "../localization";

const AdminSidebar = () => {
    return (
        <CDBSidebar
            className="sidebar-fixed vh-100"
            backgroundColor="#fff"
            textColor="#000"
        >
            <CDBSidebarHeader>
                <div className="d-flex align-items-center">
                    <img src={'images/logo.png'} alt="" style={{ width: '30px' }} />
                    <h6 style={{ marginBottom: 0, marginLeft: "0.4rem" }}>Abarrotes Cuevas</h6>
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <NavLink
                        exact
                        to="/catalogo"
                        activeClassName="activeClicked"
                        style={{ color: "inherit" }}
                    >
                        <CDBSidebarMenuItem icon="table">
                            {strings.adminSidebar.storeBranches}
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                        exact
                        to="/pedidos"
                        activeClassName="activeClicked"
                        style={{ color: "inherit" }}
                    >
                        <CDBSidebarMenuItem icon="archive">
                            {strings.adminSidebar.products}
                        </CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: "center" }}>
                <div
                    style={{
                        padding: "20px 5px",
                    }}
                >
                    2023
                </div>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
};

export default AdminSidebar;
