export default interface IPayment {
    generatePaymentIntent(paymentDetails: { accessToken: string, price: string }): Promise<boolean>;
    proceedToPay(): boolean;
}