import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { strings } from "../localization";
import { Button, Card, Form } from "react-bootstrap";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "../config";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { StoreBranchesSearchResult, getStoreBranch, registerStoreBranch, updateStoreBranch } from "../services/storebranches.service";
import "./StoreBranchFormCard.css";

const StoreBranchFormCard = ({ storeBranchId = null }) => {
    const [name, setName] = useState("");
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [address, setAddress] = useState(null);
    const [finalAddress, setFinalAddress] = useState(null); 
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [addressIsInvalid, setAddressIsInvalid] = useState(false); 
    const [openingHours, setOpeningHours] = useState(null);
    const [openingHoursIsInvalid, setOpeningHoursIsInvalid] = useState(false);
    const [closingHours, setClosingHours] = useState(null);
    const [closingHoursIsInvalid, setClosingHoursIsInvalid] = useState(false);
    const [formError, setFormError] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if(storeBranchId !== null) {
            getStoreBranch(storeBranchId).then((res) => {
                let storeBranch = res;
                switch(storeBranch.result) {
                    case StoreBranchesSearchResult.Success: {
                        setName(storeBranch.data.name);
                        setAddress(storeBranch.data.address);
                        setFinalAddress(storeBranch.data.address);
                        setLatitude(storeBranch.data.latitude);
                        setLongitude(storeBranch.data.longitude);

                        let openingHours = storeBranch.data.openingHours.date.split(" ")[1].split(":").slice(0, 2).join(":");
                        let closingHours = storeBranch.data.closingHours.date.split(" ")[1].split(":").slice(0, 2).join(":");
                        setOpeningHours(openingHours);
                        setClosingHours(closingHours);
                        break;
                    }
                    
                    case StoreBranchesSearchResult.RequestError: {
                        setFormError(strings.storeBranchForm.requestError);
                        console.log(storeBranch.data);
                        break;
                    }
    
                    default: {
                        setFormError(strings.storeBranchForm.unknownError);
                        break;
                    }
                }
            });
        }
    }, []);

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

        if(finalAddress === null || latitude === null || longitude === null) {
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
            if(storeBranchId === null) {
                registerBranch();
            }
            else {
                updateBranch();
            }
        }
    }

    const handleLocationChange = (place) => {
        setFinalAddress(place.formatted_address);
        setAddress(place.formatted_address);
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
    }

    const handleCancelButton = () => {
        navigate("/admin/sucursales");
    }

    const registerBranch = async () => {
        let registerResult = await registerStoreBranch(name, address, latitude, longitude, openingHours, closingHours);
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
            case StoreBranchesSearchResult.AlreadyExists: {
                setFormError(strings.storeBranchForm.alreadyExists);
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

    const updateBranch = async () => {
        let updateResult = await updateStoreBranch(storeBranchId, name, address, latitude, longitude, openingHours, closingHours);
        switch(updateResult.result) {
            case StoreBranchesSearchResult.Success: {
                navigate("/admin/sucursales");
                return;
            }
            case StoreBranchesSearchResult.RequestError: {
                setFormError(strings.storeBranchForm.requestError);
                console.log(updateResult.data);
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
                    <h5>{storeBranchId === null ? strings.storeBranchForm.header : strings.storeBranchForm.altHeader}</h5>
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
                                onPlaceSelected={handleLocationChange}
                                onChange={(e) => {setAddress(e.target.value); setFinalAddress(null); setLatitude(null); setLongitude(null);}}
                                value={address}
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
                            <Form.Control type="time" placeholder={strings.storeBranchForm.closingHoursPlaceholder} value={closingHours} onChange={(e) => {setClosingHours(e.target.value); console.log(e.target.value)}} isInvalid={closingHoursIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.storeBranchForm.closingTimeRequired}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <div className="form-error flex-grow-1" >{formError}</div>
                </Card.Body>
                <Card.Footer>
                    <div className="form-button-bar d-flex justify-content-end align-items-center flex-wrap-reverse">
                        <div className="form-buttons flex-shrink-0">
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
