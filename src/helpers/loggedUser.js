import Cookies from "js-cookie";

export function setLoggedUser(user) {
    Cookies.set("user", JSON.stringify(user));
}

export function isUserLogged() {
    return Cookies.get("user") != null;
}

export function getLoggedUser() {
    return JSON.parse(Cookies.get("user"));
}

export function getLoggedUserType() {
    return getLoggedUser()?.type;
}

export function getLoggedUserToken() {
    return getLoggedUser()?.token;
}

export function getLoggedUserEmail() {
    return getLoggedUser()?.email;
}

export function getLoggedUserFirstName() {
    return getLoggedUser()?.firstName;
}

export function getLoggedUserLastName() {
    return getLoggedUser()?.lastName;
}

export function getLoggedUserFullName() {
    return getLoggedUser() ? getLoggedUser().firstName + " " + getLoggedUser().lastName : null;
}
