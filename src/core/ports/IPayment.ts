export default interface IPayment {
    [x: string]: any;
    generatePayment(paymentDetails: { accessToken: string, price: string }): Promise<boolean>;
    proceedToPay(): boolean;
}