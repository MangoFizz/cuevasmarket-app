import React, { useState } from "react";
import RequestsService from "../services/requests.service";
import { getLoggedUser } from "../helpers/loggedUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css";

export default function AddressForm() {
  const [fullName, setFullName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleStreetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    RequestsService.post(
      {
        loggedUser: getLoggedUser(),
        fullName: fullName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
      },
      "users/" + getLoggedUser().id + "/shippingaddress",
    );

    console.log(fullName, streetAddress, city, state, zipCode);
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Nombre Completo:
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          aria-describedby="fullNameHelp"
          className="form-control"
          onChange={handleFullNameChange}
        />
        <small id="fullNameHelp" className="form-text text-muted">
          Por favor ingrese su nombre completo.
        </small>
      </div>
      <div className="mb-3">
        <label htmlFor="streetAddress" className="form-label">
          Dirección:
        </label>
        <input
          type="text"
          id="streetAddress"
          value={streetAddress}
          aria-describedby="streetAddressHelp"
          className="form-control"
          onChange={handleStreetAddressChange}
        />
        <small id="streetAddressHelp" className="form-text text-muted">
          Dirección de la calle y número.
        </small>
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          Ciudad:
        </label>
        <input
          type="text"
          id="city"
          value={city}
          aria-describedby="cityHelp"
          className="form-control"
          onChange={handleCityChange}
        />
        <small id="cityHelp" className="form-text text-muted">
          Ciudad donde vive.
        </small>
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">
          Estado:
        </label>
        <input
          type="text"
          id="state"
          value={state}
          aria-describedby="stateHelp"
          className="form-control"
          onChange={handleStateChange}
        />
        <small id="stateHelp" className="form-text text-muted">
          Estado donde vive.
        </small>
      </div>
      <div className="mb-3">
        <label htmlFor="zipCode" className="form-label">
          Código Postal:
        </label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          aria-describedby="zipCodeHelp"
          className="form-control"
          onChange={handleZipCodeChange}
        />
        <small id="zipCodeHelp" className="form-text text-muted">
          Código postal de su vivienda.
        </small>
      </div>
      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-mb-3 btn-primary"
          onClick={handleSubmit}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
