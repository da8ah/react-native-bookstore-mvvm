import IPayment from "../../core/ports/IPayment";
import config from "../config";

export default class PaymentStripeService implements IPayment {

    private intent: { publishableKey: string, clientSecret: string } | null = null;
    private apiURL: string = config.URL.PAYMENT;

    constructor(apiURL?: string) {
        if (apiURL) this.apiURL = apiURL;
    }

    public getIntent(): { publishableKey: string, clientSecret: string } | null {
        return this.intent;
    }

    private checkPaymentFormat(price: string): boolean {
        const priceRegEx: RegExp = /^[\d]+[.,]{1}[\d]{2}$/;
        let priceTrim = price.trim();
        return priceRegEx.test(priceTrim);
    }

    public async generatePayment(paymentDetails: { accessToken: string, price: string }): Promise<boolean> {
        try {
            let confirmation: boolean = false;
            if (!this.checkPaymentFormat(paymentDetails.price)) return false;
            let priceSplitted = paymentDetails.price.split(/[.,]{1}/);
            let priceWithStripeFormat = priceSplitted[0] + priceSplitted[1];
            let bodyContent = JSON.stringify(
                {
                    // "name": "",
                    // "email": "",
                    "amount": `${priceWithStripeFormat}`,
                    "paymentMethodType": "card",
                    // "cardNumber": "",
                    // "cardExpiry": "",
                    // "cardCvc": ""
                });
            confirmation = await fetch(this.apiURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${paymentDetails.accessToken}`
                },
                body: bodyContent
            }).then(async (res) => {
                this.intent = await res.json();
                return res.ok;
            });
            return confirmation;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    proceedToPay(): boolean {
        throw new Error("Method not implemented.");
    }

}