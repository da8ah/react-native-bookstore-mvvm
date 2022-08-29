export default interface IAuthentication {
    signin(credentials: { email: string, password: string }): Promise<boolean>;
    getToken(): string | null;
}