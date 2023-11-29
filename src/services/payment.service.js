import RequestsService from "./requests.service";

export default function SubmitPayment(
  cardNumber,
  cardName,
  cardExpiration,
  cardCvv,
) {
  return RequestsService.post(
    {
      cardNumber,
      cardName,
      cardExpiration,
      cardCvv,
      user: localStorage.getItem("user"),
    },
    "registerPaymentMethod",
  );
}
