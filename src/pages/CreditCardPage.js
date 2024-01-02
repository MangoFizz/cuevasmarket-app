import Sidebar from "../components/Sidebar";
import CreditCardForm from "../components/CreditCardForm";
import "bootstrap/dist/css/bootstrap.min.css";

const CreditCardPage = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <CreditCardForm />
    </div>
  );
};

export default CreditCardPage;
