import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { getLoggedUserType, isUserLogged, setLoggedUser } from "../helpers/loggedUser";
import { verifyUserAuth } from "../services/auth.service";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(isUserLogged() && verifyUserAuth()) {
            redirectLoggedUser();
        }
    }, [navigate]);

    const redirectLoggedUser = () => {
        if(isUserLogged()) {
            console.log(getLoggedUserType());
            let userType = getLoggedUserType();
            switch(userType) {
                case "customer": {
                    navigate("/");
                    break;
                }
                case "manager": {
                    navigate("/manager");
                    break;
                }
                case "admin": {
                    navigate("/admin/sucursales");
                    break;
                }
            }
        }
    }

    const onUserLogin = (userData) => {
        setLoggedUser(userData);
        redirectLoggedUser();
    }

    return (
        <LoginForm onSuccessCallback={onUserLogin} />
    );
}

export default LoginPage;
