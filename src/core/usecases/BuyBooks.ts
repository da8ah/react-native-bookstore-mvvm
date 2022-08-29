import IAuthentication from "../ports/IAuthentication";

export default class BuyBooks {
    public async signin(credentials: { email: string, password: string }, iAuthentication: IAuthentication): Promise<boolean> {
        return await iAuthentication.signin(credentials);
    }
}