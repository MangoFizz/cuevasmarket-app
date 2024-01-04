import RequestsService from "./requests.service";
import { getLoggedUserId } from "../helpers/loggedUser";

export function SubmitPayment(cardNumber, cardName, cardExpiration, cardCvv) {
  return RequestsService.post(
    {
      userId: getLoggedUserId(),
      cardNumber,
      cardName,
      cardExpiration,
      cardCvv,
      user: localStorage.getItem("user"),
    },
    "users/" + getLoggedUserId() + "/paymentmethods",
  );
}
