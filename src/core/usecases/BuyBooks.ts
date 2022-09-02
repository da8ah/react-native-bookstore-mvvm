import IAuthentication from "../ports/IAuthentication";
import IPayment from "../ports/IPayment";

export default class BuyBooks {

    public async signin(credentials: { email: string, password: string }, iAuthentication: IAuthentication): Promise<boolean> {
        return await iAuthentication.signin(credentials);
    }

    public async generatePayment(paymentDetails: { accessToken: string, price: string }, iPayment: IPayment):
        Promise<{ publishableKey: string, clientSecret: string } | null> {
        await iPayment.generatePayment(paymentDetails);
        const paymentGenerated = iPayment.getIntent();
        if (paymentGenerated) return paymentGenerated;
        else return null;
    }

}