import React, { useEffect, useRef } from "react";
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { strings } from "../localization";
import { getLoggedUser, getLoggedUserName, getLoggedUserType, isUserLogged, setLoggedUser } from '../helpers/loggedUser';
import { Button } from "react-bootstrap";

const ManagerSidebar = () => {
    const [isToggled, setIsToggled] = React.useState(false);
    const [hideLogOutText, setHideLogOutText] = React.useState(false);
    const sidebarRef = useRef();

    const navigate = useNavigate();

    const handleSignOutButtonClick = () => {
        setLoggedUser(null);
        navigate("/");
    }

    useEffect(() => {
        // check if user type is admin
        if(!isUserLogged() || getLoggedUserType() !== "manager") {
            navigate("/");
        }

        // check screen width to set sidebar toggled or not
        const screenWidth = window.innerWidth;
        const mainContainer = document.querySelector(".mainContainer");
        if (screenWidth < 1080) {
            setIsToggled(true);
            mainContainer.style.marginLeft = "80px";
        }
        else {
            setIsToggled(false);
            mainContainer.style.marginLeft = "270px";
        }

        if(sidebarRef.current) {
            const observer = new MutationObserver((mutations) => {
                console.log(mutations);
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === "class") {
                        // get .mainContainer div and update its margin-left.
                        const mainContainer = document.querySelector(".mainContainer");
                        mainContainer.style.marginLeft = mutation.target.classList.contains("toggled") ? "80px" : "270px";
                    }
                });
            });
            observer.observe(sidebarRef.current, { subtree: true, attributes: true, attributeFilter: ["class"] });
            return () => observer.disconnect();
        }
    });

    return (
        <CDBSidebar className="sidebar-fixed" id="sidebar" backgroundColor="#fff" textColor="#000" toggled={isToggled} maxWidth="270px" minWidth="80px" breakpoint={1080} ref={sidebarRef} >
            <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                <div className="d-flex align-items-center">
                    <img src={'/images/logo.png'} alt="" style={{ width: '30px' }}/>
                    <h6 style={{ marginBottom: "0", marginLeft: "0.4rem" }}>Abarrotes Cuevas</h6>
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <NavLink exact to="/gerente/inventario" activeClassName="activeClicked" style={{ color: "inherit" }}>
                        <CDBSidebarMenuItem icon="table">
                            {strings.managerSidebar.branchInventory}
                        </CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: "center" }}>
                <Button variant="outline-danger" size="md" className="mb-3" onClick={handleSignOutButtonClick}>
                    <div className="d-flex align-items-center justify-content-center">
                        <i class="bi bi-box-arrow-left" style={{ marginRight: "0.4rem" }}></i>
                    </div>
                </Button>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
};

export default ManagerSidebar;
