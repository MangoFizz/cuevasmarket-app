import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`d-flex flex-column p-3 bg-light ${
                isOpen ? "open" : ""
            }`}
            style={{ width: "280px" }}
        >
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
            <NavLink
                to="/catalogo"
                exact
                activeClassName="active"
                className="nav-link"
            >
                Catálogo
            </NavLink>
            <NavLink
                to="/pedidos"
                exact
                activeClassName="active"
                className="nav-link"
            >
                Pedidos
            </NavLink>
        </div>
    );
};

export default Sidebar;
