import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthResult, authUser } from "../services/auth.service";
import { Card, Form } from "react-bootstrap";
import { strings } from "../localization";
import "./LoginForm.css";

const LoginForm = ({ onSuccessCallback, showRegisterButton = false }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [usernameInputIsInvalid, setUsernameInputIsInvalid] = useState(false)
    const [passwordInputIsInvalid, setPasswordInputIsInvalid] = useState(false)

    const checkFormFields = () => {
        setFormError("");
        setUsernameInputIsInvalid(false);
        setPasswordInputIsInvalid(false);
        if(username === "") {
            setFormError(strings.loginForm.usernameRequired);
            setUsernameInputIsInvalid(true);
            return;
        }
        if(username.length < 4) {
            setFormError(strings.loginForm.usernameInvalid);
            setUsernameInputIsInvalid(true);
            return;
        }
        if(password === "") {
            setFormError(strings.loginForm.passwordRequired);
            setPasswordInputIsInvalid(true);
            return;
        }
        logIn();
    }

    const logIn = () => {
        authUser(username, password).then(async r => {
            switch(r.result) {
                case UserAuthResult.Success: {
                    setFormError("OK");
                    onSuccessCallback(r.data);
                    break;
                }
                case UserAuthResult.InvalidCredentials: {
                    setFormError(strings.loginForm.invalidCredentials);
                    break;
                }
                case UserAuthResult.TooManyAttempts: {
                    setFormError(strings.loginForm.tooManyAttempts);
                    break;
                }
                default: {
                    setFormError(strings.common.unknownError);
                    break;
                }
            }
        })
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <form>
                <div className="card mx-auto login-form shadow-lg">
                    <div className="card-body">
                        <div className="logo">
                            <img src={"images/logo.png"} alt="" />
                            <h4>Abarrotes Cuevas</h4>
                            <span>{strings.loginForm.header}</span>
                        </div>
                        <div className="mb-3">
                            <label for="input-username" className="form-label">{strings.loginForm.usernameLabel}</label>
                            <input type="username" className={!usernameInputIsInvalid ? "form-control" : "form-control is-invalid"} id="input-username" value={username} onChange={ev => setUsername(ev.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label for="input-password" className="form-label">{strings.loginForm.passwordLabel}</label>
                            <div className="input-group">
                                <input type={passwordVisible ? "text" : "password"} className={!passwordInputIsInvalid ? "form-control" : "form-control is-invalid"} id="input-password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                                <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: "pointer"}}>
                                    <i className={!passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                </span>
                            </div>
                        </div>
                        {showRegisterButton ?
                            <div className="d-flex justify-content-end">
                                <a href="/registrar-cliente" className="text-decoration-none">{strings.loginForm.registerLink}</a>
                            </div>
                        : null}
                    </div>
                    <div className="card-footer d-flex flex-row-reverse align-items-center justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={checkFormFields}>{strings.loginForm.submitButtonLabel}</button>
                        <span className="error-message text-danger card-text">{formError}</span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
