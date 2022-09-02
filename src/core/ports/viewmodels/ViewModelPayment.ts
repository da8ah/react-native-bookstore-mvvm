import PaymentStripeService from "../../../services/cart/PaymentStripeService";
import BuyBooks from "../../usecases/BuyBooks"

const buyBooksUseCase = new BuyBooks();

export default class ViewModelPayment {

    private accessTokenFromLogin: string;
    private price: string;
    private generated: boolean = false;
    private paymentID: { publishableKey: string, clientSecret: string } | null = null;

    constructor(accessTokenFromLogin: string, price: string) {
        this.accessTokenFromLogin = accessTokenFromLogin;
        this.price = price;
    }

    public isGenerated(): boolean {
        return this.generated;
    }

    public getPaymentID(): { publishableKey: string, clientSecret: string } | null {
        return this.paymentID;
    }

    public async createNewPayment() {
        this.paymentID = await buyBooksUseCase.generatePayment(
            { accessToken: this.accessTokenFromLogin, price: this.price },
            new PaymentStripeService()
        );
        if (this.paymentID) this.generated = true;
    }

}