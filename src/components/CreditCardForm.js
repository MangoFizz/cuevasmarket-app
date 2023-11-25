import React from "react";
import "./CreditCardForm.css";
import submitPayment from "../services/submitPayment";

export default function CreditCardForm() {
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardName, setCardName] = React.useState("");
    const [cardExpiration, setCardExpiration] = React.useState("");
    const [cardCvv, setCardCvv] = React.useState("");

    const handleCardNumberChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
            .trim();
        setCardNumber(value);
    };

    const handleCardNameChange = (event) => {
        const value = event.target.value.toUpperCase();
        setCardName(value);
    };

    const handleCardExpirationChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d{2})/, "$1/$2")
            .trim();
        setCardExpiration(value);
    };

    const handleCardCvvChange = (event) => {
        const value = event.target.value.replace(/\D/g, "").trim();
        setCardCvv(value);
    };

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(cardNumber, cardName, cardExpiration, cardCvv);

        if (cardNumber.length <= 0 || cardNumber.length > 19) {
            alert("Número de tarjeta inválido");
            return;
        }

        if (cardName.length <= 0) {
            alert("Nombre del titular inválido");
            return;
        }

        if (cardExpiration.length < 5 || cardExpiration.length > 7) {
            alert("Fecha de expiración inválida");
            console.log(cardExpiration);
            return;
        }

        if (cardCvv.length <= 2) {
            alert("CVV inválido");
            return;
        }

        setIsSubmitting(true);
        try {
            await submitPayment(cardNumber, cardName, cardExpiration, cardCvv);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setCardNumber("");
            setCardName("");
            setCardExpiration("");
            setCardCvv("");
        }
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="cardNumber" className="form-label">
                    Número de Tarjeta:
                </label>
                <input
                    type="text"
                    id="cardNumber"
                    aria-describedby="cardNumberHelp"
                    placeholder="0000 0000 0000 0000"
                    className="form-control"
                    onChange={handleCardNumberChange}
                    maxLength="19"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cardName" className="form-label">
                    Nombre del Titular:
                </label>
                <input
                    type="text"
                    id="cardName"
                    className="form-control"
                    onChange={handleCardNameChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cardExpiration" className="form-label">
                    Fecha de Expiración:
                </label>
                <input
                    type="text"
                    id="cardExpiration"
                    aria-describedby="cardExpirationHelp"
                    placeholder="MM/AA"
                    className="form-control"
                    onChange={handleCardExpirationChange}
                    maxLength="5"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cardCvv" className="form-label">
                    CVV
                </label>
                <input
                    type="text"
                    id="cardCvv"
                    aria-describedby="cardCvvHelp"
                    placeholder="000"
                    className="form-control"
                    onChange={handleCardCvvChange}
                    maxLength="3"
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary py-2 px-4"
                onClick={handleSubmit}
            >
                Pagar
            </button>
        </form>
    );
}
