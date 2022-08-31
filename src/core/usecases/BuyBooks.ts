import IAuthentication from "../ports/IAuthentication";
import IPayment from "../ports/IPayment";

export default class BuyBooks {

    public async signin(credentials: { email: string, password: string }, iAuthentication: IAuthentication): Promise<boolean> {
        return await iAuthentication.signin(credentials);
    }

    public async checkout(paymentDetails: { accessToken: string, price: string }, iPayment: IPayment):
        Promise<{ publishableKey: string, clientSecret: string }> {
        await iPayment.generatePaymentIntent(paymentDetails);
        return iPayment.getIntent();
    }

}