import PaymentStripeService from "../../../services/cart/PaymentStripeService";
import BuyBooks from "../../usecases/BuyBooks"

const buyBooksUseCase = new BuyBooks();

export default class ViewModelPayment {

    private accessTokenFromLogin: string;
    private price: string;

    constructor(accessTokenFromLogin: string, price: string) {
        this.accessTokenFromLogin = accessTokenFromLogin;
        this.price = price;
    }

    public async createPayment() {
        return await buyBooksUseCase.checkout(
            { accessToken: this.accessTokenFromLogin, price: this.price },
            new PaymentStripeService()
        );
    }

}