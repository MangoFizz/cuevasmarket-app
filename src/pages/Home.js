import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
        <div>
            <h1>CASA</h1>
        </div>
    );
}

export default Home;
