import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CataloguePage = () => {
    let navigate = useNavigate();

    // useEffect(() => {
    //     let authType = Cookies.get("auth-type");
    //     if(authType == "account") {
    //         navigate("/events");
    //         return;
    //     }
    //     else if(authType == "doorkeeper") {
    //         navigate("/scan-invites");
    //         return;
    //     }
    //     else {
    //         navigate("/login");
    //         return;
    //     }
    // }, [navigate]);

    return (
        <>
            <Navbar />
        </>
    );
}

export default CataloguePage;
