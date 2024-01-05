import React from "react";
import { useNavigate } from "react-router-dom";
import { parse } from "twemoji-parser";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  getLoggedUser,
  getLoggedUserName,
  isUserLogged,
  setLoggedUser,
} from "../helpers/loggedUser";
import { strings } from "../localization";
import Cart from "./Cart";
import "./CustomerNavbar.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isUserLogged());
    setLoggedUserData(getLoggedUser());
  }, [loggedIn]);

    const onLogButton = () => {
        if(loggedIn) {
            setLoggedUser(null);
            setLoggedUserData(null);
            setLoggedIn(false);
            navigate("/");
        }
        else {
            navigate("/iniciar-sesion");
        }
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <img
            alt="Mango icon"
            src={"images/logo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span>Abarrotes Cuevas</span>
        </a>
        <Cart />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                {strings.navbar.home}
              </a>
            </li>
          </ul>
          {loggedIn ? (
            <span className="navbar-text navbar-user-name">
              {loggedUserData.name}
            </span>
          ) : null}
          <Button variant="outline-primary" onClick={onLogButton}>
            {loggedIn ? strings.navbar.logout : strings.navbar.login}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
