import { useNavigate } from "react-router-dom";
import RegisterCustomerForm from "../components/RegisterCustomerForm";

const RegisterCustomer = () => {
    const navigate = useNavigate();

    const onSuccessfulRegister = () => {
        navigate("/iniciar-sesion");
    }

    const onCancelRegister = () => {
        navigate("/iniciar-sesion");
    }

    return (
        <RegisterCustomerForm onSuccessCallback={onSuccessfulRegister} onCancelCallback={onCancelRegister} />
    );
}

export default RegisterCustomer;
