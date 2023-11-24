export default function submitPayment(
    cardNumber,
    cardName,
    cardExpiration,
    cardCvv,
) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cardNumber === "4242 4242 4242 4242") {
                resolve();
            } else {
                reject(new Error("Payment failed"));
            }
        }, 1000);
    });
}
