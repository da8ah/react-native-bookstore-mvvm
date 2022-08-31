import IAuthentication from "../../core/ports/IAuthentication";
import config from "../config";

export default class AuthenticationService implements IAuthentication {

    private static instance: AuthenticationService | null = null;
    private apiURL: string = config.URL.AUTHENTICATION;
    private static token: string | null = null;

    private constructor() { };

    public static getInstance(): IAuthentication {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService();
        }
        return AuthenticationService.instance;
    }

    public getToken(): string | null {
        return AuthenticationService.token;
    }

    public async signin(credentials: { email: string, password: string }): Promise<boolean> {
        try {
            let bodyContent = JSON.stringify({ ...credentials });

            const signin = await fetch(this.apiURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyContent
            });

            if (signin.ok) {
                AuthenticationService.token = await signin.json().then(res => res.jwt);
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}