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

const Sidebar = () => {
    return (
        <CDBSidebar
            className="sidebar-fixed"
            backgroundColor="#fff"
            textColor="#000"
        >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a
                    href="/"
                    className="text-decoration-none"
                    style={{ color: "inherit" }}
                >
                    Abarrotes Cuevas
                </a>
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
                            Catalogo
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                        exact
                        to="/pedidos"
                        activeClassName="activeClicked"
                        style={{ color: "inherit" }}
                    >
                        <CDBSidebarMenuItem icon="archive">
                            Pedidos
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

export default Sidebar;
