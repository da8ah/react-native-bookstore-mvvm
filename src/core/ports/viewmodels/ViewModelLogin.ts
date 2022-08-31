import AuthenticationService from "../../../services/auth/AuthenticationService";
import BuyBooks from "../../usecases/BuyBooks";
import IAuthentication from "../IAuthentication";

export default class ViewModelLogin {

    private authenticationService: IAuthentication = AuthenticationService.getInstance();
    private logged: boolean = false;
    private BuyBooksUseCase = new BuyBooks();

    public isLogged() {
        return this.logged;
    };

    public getAccessToken(): string | null {
        if (this.logged) return this.authenticationService.getToken();
        return null;
    }

    public async login(credentials: { email: string, password: string }) {
        this.logged = false;
        (!this.authenticationService.getToken()) ? (
            this.logged = await this.BuyBooksUseCase.signin(credentials, this.authenticationService)
        ) : (this.logged = true)
    }

}