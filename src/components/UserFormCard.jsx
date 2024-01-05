import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { strings } from "../localization";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { StoreBranchesSearchResult, getStoreBranch, registerStoreBranch, updateStoreBranch } from "../services/storebranches.service";
import { UsersServiceResult, getUser, registerUser, updateUser } from "../services/users.service";
import "./UserFormCard.css";

const validUserTypes = [
    "admin",
    "manager",
    "delivery man"
];

const UserFormCard = ({ userId = null }) => {
    const [username, setUsername] = useState("");
    const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
    const [surnames, setSurnames] = useState("");
    const [surnamesIsInvalid, setSurnamesIsInvalid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);
    const [type, setType] = useState("admin");
    const [typeIsInvalid, setTypeIsInvalid] = useState(false);
    const [formError, setFormError] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if(userId !== null) {
            getUser(userId).then((res) => {
                let user = res.data;
                switch(res.result) {
                    case StoreBranchesSearchResult.Success: {
                        setUsername(user.username);
                        setFirstName(user.firstName);
                        setSurnames(user.surnames);
                        setPassword(user.password);
                        setType(user.type);
                        break;
                    }
                    
                    case StoreBranchesSearchResult.RequestError: {
                        setFormError(strings.registerUser.requestError);
                        console.log(user.data);
                        break;
                    }
    
                    default: {
                        setFormError(strings.registerUser.unknownError);
                        break;
                    }
                }
            });
        }
    }, []);

    const handleRegisterButton = () => {
        let formValid = true;
        setFormError("");
        setUsernameIsInvalid(false);
        setFirstNameIsInvalid(false);
        setSurnamesIsInvalid(false);
        setPasswordIsInvalid(false);
        setTypeIsInvalid(false);

        if(username === "") {
            setUsernameIsInvalid(true);
            formValid = false;
        }
        else if(username.length < 4 || username.length > 50) {
            setUsernameIsInvalid(true);
            formValid = false;
        }

        if(firstName === "") {
            setFirstNameIsInvalid(true);
            formValid = false;
        }
        else if(firstName.length < 4 || firstName.length > 100) {
            setFirstNameIsInvalid(true);
            formValid = false;
        }

        if(surnames === "") {
            setSurnamesIsInvalid(true);
            formValid = false;
        }
        else if(surnames.length < 4 || surnames.length > 200) {
            setSurnamesIsInvalid(true);
            formValid = false;
        }

        if(password !== "") {
            // check for a strong password: at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
            if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
                setPasswordIsInvalid(true);
                formValid = false;
            }

            if(confirmPassword === "" || confirmPassword !== password) {
                setConfirmPasswordIsInvalid(true);
                formValid = false;
            }
        }

        // valid types: admin, manager, delivery man
        if(type === "" || (type !== "admin" && type !== "manager" && type !== "delivery man")) {
            setTypeIsInvalid(true);
            formValid = false;
        }

        if(formValid) {
            if(userId === null) {
                doRegisterUser();
            }
            else {
                doUpdateUser();
            }
        }
    }

    const handleCancelButton = () => {
        navigate("/admin/usuarios");
    }

    const doRegisterUser = async () => {
        let registerResult = await registerUser(firstName, surnames, null, username, password, type);
        switch(registerResult.result) {
            case UsersServiceResult.Success: {
                navigate("/admin/usuarios");
                return;
            }
            case UsersServiceResult.RequestError: {
                setFormError(strings.registerUser.requestError);
                return;
            }
            case UsersServiceResult.AlreadyExists: {
                setFormError(strings.registerUser.alreadyExists);
                return;
            }
            case UsersServiceResult.UnknownError: {
                setFormError(strings.registerUser.unknownError);
                return;
            }
            default: {
                setFormError(strings.registerUser.unknownError);
                return;
            }
        }
    }

    const doUpdateUser = async () => {
        let finalPassword = password !== ""  ? password : null;
        let updateResult = await updateUser(userId, firstName, surnames, null, username, finalPassword, type);
        switch(updateResult.result) {
            case UsersServiceResult.Success: {
                navigate("/admin/usuarios");
                return;
            }
            case UsersServiceResult.RequestError: {
                setFormError(strings.registerUser.requestError);
                return;
            }
            case UsersServiceResult.UnknownError: {
                setFormError(strings.registerUser.unknownError);
                return;
            }
            default: {
                setFormError(strings.registerUser.unknownError);
                return;
            }
        }
    }

    return ( 
        <div className="store-branch-form-card">
            <Card>
                <Card.Header>
                    <h5>{userId === null ? strings.registerUser.header : strings.registerUser.altHeader}</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="firstNameInput">
                            <Form.Label>{strings.registerUser.firstNameLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerUser.firstNamePlaceholder} value={firstName} onChange={(e) => setFirstName(e.target.value)} isInvalid={firstNameIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerUser.firstNameRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surnamesInput">
                            <Form.Label>{strings.registerUser.surnamesLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerUser.surnamesPlaceholder} value={surnames} onChange={(e) => setSurnames(e.target.value)} isInvalid={surnamesIsInvalid} />
                            <Form.Control.Feedback type="invalid">{strings.registerUser.surnamesRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="usernameInput">
                            <Form.Label>{strings.registerUser.usernameLabel}</Form.Label>
                            <Form.Control type="text" placeholder={strings.registerUser.usernamePlaceholder} value={username} onChange={(e) => setUsername(e.target.value)} isInvalid={usernameIsInvalid} disabled={userId !== null} />
                            <Form.Control.Feedback type="invalid">{strings.registerUser.usernameRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordInput">
                            <Form.Label>{strings.registerUser.passwordLabel}</Form.Label>
                            <InputGroup>
                                <Form.Control type={passwordVisible ? "text" : "password"} placeholder={strings.registerUser.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={passwordIsInvalid} />
                                <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: "pointer"}}>
                                    <i className={!passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                </span>
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">{strings.registerUser.passwordRequired}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPasswordInput">
                            <Form.Label>{strings.registerUser.confirmPasswordLabel}</Form.Label>
                            <InputGroup>
                                <Form.Control type={confirmPasswordVisible ? "text" : "password"} placeholder={strings.registerUser.confirmPasswordPlaceholder} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={confirmPasswordIsInvalid} />
                                <span className="input-group-text" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={{cursor: "pointer"}}>
                                    <i className={!confirmPasswordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                </span>
                                <Form.Control.Feedback type="invalid">{strings.registerUser.confirmPasswordRequired}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="typeSelectInput">
                            <Form.Label>{strings.registerUser.typeLabel}</Form.Label>
                            <Form.Select onChange={(e) => setType(e.target.value)} isInvalid={typeIsInvalid} disabled={userId !== null}>
                                {validUserTypes.map((type) => {
                                    return <option value={type}>{strings.registerUser[type]}</option>
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{strings.registerUser.categoryRequired}</Form.Control.Feedback>
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

export default UserFormCard;
