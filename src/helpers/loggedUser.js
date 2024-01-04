import Cookies from "js-cookie";

export function setLoggedUser(user) {
  if (user) {
    Cookies.set("user", JSON.stringify(user));
  } else {
    Cookies.remove("user");
  }
}

export function isUserLogged() {
  return Cookies.get("user") != null;
}

export function getLoggedUser() {
  let user = Cookies.get("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function getLoggedUserId() {
  return getLoggedUser()?.id;
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

export function getLoggedUserName() {
  return getLoggedUser()?.name;
}

export function getLoggedUserLastName() {
  return getLoggedUser()?.lastName;
}

export function getLoggedUserFullName() {
  return getLoggedUser()
    ? getLoggedUser().firstName + " " + getLoggedUser().lastName
    : null;
}
