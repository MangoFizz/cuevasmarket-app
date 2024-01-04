import CreditCardForm from "../components/CreditCardForm";
import CustomerNavbar from "../components/CustomerNavbar";

const CreditCardPage = () => {
  return (
    //style to use full height of the page
    <div style={{ height: "100vh" }}>
      <CustomerNavbar />
      <CreditCardForm />
    </div>
  );
};

export default CreditCardPage;
