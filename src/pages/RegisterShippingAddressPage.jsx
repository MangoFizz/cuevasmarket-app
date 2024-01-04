import CustomerNavbar from "../components/CustomerNavbar";
import AddressForm from "../components/AddressForm";

const RegisterShippingAddressPage = () => {
  return (
    <>
      <CustomerNavbar />
      <div style={{ height: "100vh" }}>
        <AddressForm />
      </div>
    </>
  );
};

export default RegisterShippingAddressPage;
