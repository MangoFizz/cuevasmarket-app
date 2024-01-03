import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { strings } from "../localization";
import { Button, Card, Form } from "react-bootstrap";
import "./StoreBranchFormCard.css";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../config";
import ReactGoogleAutocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { StoreBranchesSearchResult, registerStoreBranch } from "../services/storebranches.service";

const StoreBranchFormCard = ({ storeBranchId = null }) => {
    const [name, setName] = useState("");
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [address, setAddress] = useState(null);
    const [addressIsInvalid, setAddressIsInvalid] = useState(false); 
    const [openingHours, setOpeningHours] = useState(null);
    const [openingHoursIsInvalid, setOpeningHoursIsInvalid] = useState(false);
    const [closingHours, setClosingHours] = useState(null);
    const [closingHoursIsInvalid, setClosingHoursIsInvalid] = useState(false);
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();

    const handleRegisterButton = () => {
        let formValid = true;
        setFormError("");
        setNameIsInvalid(false);
        setOpeningHoursIsInvalid(false);
        setClosingHoursIsInvalid(false);

        if(name === "") {
            setNameIsInvalid(true);
            formValid = false;
        }
        else if(name.length < 4) {
            setNameIsInvalid(true);
            formValid = false;
        }
        else if(name.length > 100) {
            setNameIsInvalid(true);
            formValid = false;
        }

        if(address === null) {
            setAddressIsInvalid(true);
            formValid = false;
        }

        if(openingHours === null) {
            setOpeningHoursIsInvalid(true);
            formValid = false;
        }
        
        if(closingHours === null) {
            setClosingHoursIsInvalid(true);
            formValid = false;
        }

        if(formValid) {
            registerBranch();
        }
    }

    const handleCancelButton = () => {
        navigate("/admin/sucursales");
    }

    const registerBranch = async () => {
        let registerResult = await registerStoreBranch(name, address.formatted_address, address.geometry.location.lat(), address.geometry.location.lng(), openingHours, closingHours);
        switch(registerResult.result) {
            case StoreBranchesSearchResult.Success: {
                navigate("/admin/sucursales");
                return;
            }
            case StoreBranchesSearchResult.RequestError: {
                setFormError(strings.storeBranchForm.requestError);
                console.log(registerResult.data);
                return;
            }
            case StoreBranchesSearchResult.UnknownError: {
                setFormError(strings.storeBranchForm.unknownError);
                return;
            }
            default: {
                setFormError(strings.storeBranchForm.unknownError);
                return;
            }
        }
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
                                isInvalid={addressIsInvalid}
                                className={"form-control"}
                                apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
                                options={ { types: ['address'] } }
                                onPlaceSelected={(place) => setAddress(place)}
                            />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.addressRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOpeningHours">
                            <Form.Label>{strings.storeBranchForm.openingTimeLabel}</Form.Label>
                            <Form.Control type="time" placeholder={strings.storeBranchForm.openingHoursPlaceholder} value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} isInvalid={openingHoursIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.openingTimeRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicClosingHours">
                            <Form.Label>{strings.storeBranchForm.closingTimeLabel}</Form.Label>
                            <Form.Control type="time" placeholder={strings.storeBranchForm.closingHoursPlaceholder} value={closingHours} onChange={(e) => setClosingHours(e.target.value)} isInvalid={closingHoursIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.closingTimeRequired}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <div className="form-button-bar d-flex justify-content-end">
                        <div className="form-error">{formError}</div>
                        <div className="form-buttons">
                            <Button className="btn btn-primary" onClick={handleRegisterButton}>{strings.storeBranchForm.registerButton}</Button>
                            <Button className="btn btn-secondary" onClick={handleCancelButton}>{strings.storeBranchForm.cancelButton}</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default StoreBranchFormCard;
