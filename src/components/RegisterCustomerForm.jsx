import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { strings } from "../localization";
import { useState } from "react";

import "./RegisterCustomerForm.css";
import { UsersServiceResult, registerUser } from "../services/users.service";
import { UserAuthResult, registerCustomer } from "../services/auth.service";

const RegisterCustomerForm = ({ onSuccessCallback, onCancelCallback }) => {
    const [firstName, setFirstName] = useState("");
    const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
    const [surnames, setSurnames] = useState("");
    const [surnamesIsInvalid, setSurnamesIsInvalid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberIsInvalid, setPhoneNumberIsInvalid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);
    const [formError, setFormError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const checkFormFields = () => {
        let formValid = true;

        setFormError("");
        setFirstNameIsInvalid(false);
        setSurnamesIsInvalid(false);
        setPhoneNumberIsInvalid(false);
        setPasswordIsInvalid(false);
        setConfirmPasswordIsInvalid(false);
        
        if(firstName === "") {
            setFormError(strings.registerCustomer.firstNameRequired);
            setFirstNameIsInvalid(true);
            formValid = false;
        }
        else if(firstName.length < 4 || firstName.length > 50) {
            setFormError(strings.registerCustomer.firstNameInvalid);
            setFirstNameIsInvalid(true);
            formValid = false;
        }

        if(surnames === "") {
            setFormError(strings.registerCustomer.surnamesRequired);
            setSurnamesIsInvalid(true);
            formValid = false;
        }
        else if(surnames.length < 4 || surnames.length > 50) {
            setFormError(strings.registerCustomer.surnamesInvalid);
            setSurnamesIsInvalid(true);
            formValid = false;
        }

        if(phoneNumber === "") {
            setFormError(strings.registerCustomer.phoneNumberRequired);
            setPhoneNumberIsInvalid(true);
            formValid = false;
        }
        else if(phoneNumber.toString().length !== 10) {
            setFormError(strings.registerCustomer.phoneNumberInvalid);
            setPhoneNumberIsInvalid(true);
            formValid = false;
        }

        // check for a strong password: at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
        if(password === "") {
            setPasswordIsInvalid(true);
            formValid = false;
        }
        else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            setFormError(strings.registerCustomer.passwordInvalid);
            formValid = false;
        }

        if(confirmPassword === "" || confirmPassword !== password) {
            setConfirmPasswordIsInvalid(true);
            formValid = false;
        }

        if(formValid) {
            register();
        }
    }

    const register = async () => {
        try {
            let response = await registerCustomer(firstName, surnames, phoneNumber, password);
            if(response.result === UserAuthResult.Success) {
                setFormError("OK");
                onSuccessCallback(response.data);
            }
            else if(response.result === UserAuthResult.AlreadyExists) {
                setFormError(strings.registerCustomer.alreadyExists);
            }
            else {
                setFormError(strings.registerCustomer.registerError);
            }
        }
        catch(e) {
            setFormError(strings.common.unknownError);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 register-form-wrapper">
            <Card className="w-100">
                <Card.Header>
                    <Card.Title>{strings.registerCustomer.header}</Card.Title>
                </Card.Header>
                <Card.Body className="text-start">
                    <Form>
                        <Form.Group className="mb-3" controlId="firstNameInput">
                            <Form.Label>{strings.registerCustomer.firstNameLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerCustomer.firstNamePlaceholder} value={firstName} onChange={(e) => setFirstName(e.target.value)} isInvalid={firstNameIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerCustomer.firstNameRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surnamesInput">
                            <Form.Label>{strings.registerCustomer.surnamesLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerCustomer.surnamesPlaceholder} value={surnames} onChange={(e) => setSurnames(e.target.value)} isInvalid={surnamesIsInvalid} autocomplete="off" />
                            <Form.Control.Feedback type="invalid">{strings.registerCustomer.surnamesRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phoneNumberInput">
                            <Form.Label>{strings.registerCustomer.phoneNumberLabel}</Form.Label>
                            <Form.Control type="number" placeholder={strings.registerCustomer.phoneNumberPlaceholder} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} isInvalid={phoneNumberIsInvalid} autocomplete="off"  />
                            <Form.Control.Feedback type="invalid">{strings.registerCustomer.phoneNumberRequired}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="passwordInput">
                            <Form.Label>{strings.registerCustomer.passwordLabel}</Form.Label>
                            <InputGroup>
                                <Form.Control type={passwordVisible ? "text" : "password"} placeholder={strings.registerCustomer.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={passwordIsInvalid} autocomplete="new-password" />
                                <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: "pointer"}}>
                                    <i className={!passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                </span>
                                <Form.Control.Feedback type="invalid">{strings.registerCustomer.passwordRequired}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPasswordInput">
                            <Form.Label>{strings.registerCustomer.confirmPasswordLabel}</Form.Label>
                            <InputGroup>
                                <Form.Control type={confirmPasswordVisible ? "text" : "password"} placeholder={strings.registerCustomer.confirmPasswordPlaceholder} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={confirmPasswordIsInvalid} />
                                <span className="input-group-text" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={{cursor: "pointer"}}>
                                    <i className={!confirmPasswordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                </span>
                                <Form.Control.Feedback type="invalid">{strings.registerCustomer.confirmPasswordRequired}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="d-flex align-items-center">
                        <span className="text-danger">{formError}</span>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <div className="form-button-bar">
                            <Button variant="primary" onClick={checkFormFields}>{strings.registerCustomer.registerButton}</Button>
                            <Button variant="secondary" onClick={onCancelCallback}>{strings.registerCustomer.cancelButton}</Button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default RegisterCustomerForm;
