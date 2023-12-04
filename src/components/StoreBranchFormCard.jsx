import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { strings } from "../localization";
import { Button, Card, Form } from "react-bootstrap";
import "./StoreBranchFormCard.css";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../config";
import ReactGoogleAutocomplete, { usePlacesWidget } from "react-google-autocomplete";

const StoreBranchFormCard = ({ storeBranchId = null }) => {
    const [name, setName] = useState("");
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [address, setAddress] = useState("");
    const [addressIsInvalid, setAddressIsInvalid] = useState(false);
    const [city, setCity] = useState("");
    const [cityIsInvalid, setCityIsInvalid] = useState(false);
    const [openingHours, setOpeningHours] = useState(0);
    const [openingHoursIsInvalid, setOpeningHoursIsInvalid] = useState(false);
    const [closingHours, setClosingHours] = useState(0);
    const [closingHoursIsInvalid, setClosingHoursIsInvalid] = useState(false);
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();

    const handleRegisterButton = () => {
        let formValid = true;
        setFormError("");
        setNameIsInvalid(false);
        setAddressIsInvalid(false);
        setCityIsInvalid(false);
        setOpeningHoursIsInvalid(false);
        setClosingHoursIsInvalid(false);

        const error = (message) => {
            if(!formValid) {
                setFormError(message);
                formValid = true;
            }
        }

        if(name === "") {
            setNameIsInvalid(true);
            error(strings.storeBranchForm.nameRequired);
        }
        if(name.length < 4) {
            setNameIsInvalid(true);
            error(strings.storeBranchForm.nameTooShort);
        }
        if(name.length > 100) {
            setNameIsInvalid(true);
            error(strings.storeBranchForm.nameTooLong);
        }
        
        if(address === "") {
            setAddressIsInvalid(true);
            error(strings.storeBranchForm.addressRequired);
        }

        if(city === "") {
            error(strings.storeBranchForm.cityRequired);
            setCityIsInvalid(true);
        }

        if(formValid) {
            registerBranch();
        }
    }

    const handleCancelButton = () => {
        navigate("/sucursales");
    }

    const registerBranch = () => {
        
    }

    return ( 
        <div className="store-branch-form-card">
            <Card>
                <Card.Header>
                    <h5>{strings.storeBranchForm.header}</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>{strings.storeBranchForm.nameLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.storeBranchForm.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} isInvalid={nameIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.nameRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>{strings.storeBranchForm.addressLabel}</Form.Label>
                            <ReactGoogleAutocomplete 
                                className={"form-control"}
                                apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
                                options={ { types: ['address'] } }
                                onPlaceSelected={(place) => setAddress(place.formatted_address)}
                            />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.addressRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOpeningHours">
                            <Form.Label>{strings.storeBranchForm.openingTimeLabel}</Form.Label>
                            <Form.Control type="time" placeholder={strings.storeBranchForm.openingHoursPlaceholder} value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} isInvalid={openingHoursIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.openingHoursRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicClosingHours">
                            <Form.Label>{strings.storeBranchForm.closingTimeLabel}</Form.Label>
                            <Form.Control type="time" placeholder={strings.storeBranchForm.closingHoursPlaceholder} value={closingHours} onChange={(e) => setClosingHours(e.target.value)} isInvalid={closingHoursIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.closingHoursRequired}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <div className="form-error">{formError}</div>
                    <div className="form-buttons">
                        <Button className="btn btn-primary" onClick={handleRegisterButton}>{strings.storeBranchForm.registerButton}</Button>
                        <Button className="btn btn-secondary" onClick={handleCancelButton}>{strings.storeBranchForm.cancelButton}</Button>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default StoreBranchFormCard;
