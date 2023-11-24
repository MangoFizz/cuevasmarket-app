import React from "react";
import "./CreditCardForm.css";
import submitPayment from "../services/submitPayment";

export default function CreditCardForm() {
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardName, setCardName] = React.useState("");
    const [cardExpiration, setCardExpiration] = React.useState("");
    const [cardCvv, setCardCvv] = React.useState("");

    const handleCardNumberChange = (event) => {
        if (event.target.value.length > 0) {
            const regex = /^[0-9\b\s]*$/;
            if (regex.test(event.target.value)) {
                if (event.target.value.length === 4) {
                    setCardNumber(event.target.value + " ");
                } else if (event.target.value.length === 9) {
                    setCardNumber(event.target.value + " ");
                } else if (event.target.value.length === 14) {
                    setCardNumber(event.target.value + " ");
                }
            }
        }
    };

    const handleCardNameChange = (event) => {
        setCardName(event.target.value.toUpperCase());
    };

    const handleCardExpirationChange = (event) => {
        // only allow numbers and "/"
        if (event.target.value.length > 0) {
            const regex = /^[0-9\b\/]*$/;
            if (regex.test(event.target.value)) {
                if (event.target.value.length === 2) {
                    setCardExpiration(event.target.value + "/");
                }
            }
        }
    };

    const handleCardCvvChange = (event) => {
        if (event.target.value.length > 0) {
            const regex = /^[0-9\b]*$/;
            if (regex.test(event.target.value)) {
                setCardCvv(event.target.value);
            }
        }
    };

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (cardNumber.length <= 0 || cardNumber.length > 19) {
            alert("Número de tarjeta inválido");
            return;
        }

        if (cardName.length <= 0) {
            alert("Nombre del titular inválido");
            return;
        }

        if (cardExpiration.length <= 4) {
            alert("Fecha de expiración inválida");
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
