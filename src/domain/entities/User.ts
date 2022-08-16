type UserParamList = {
    email: string,
    password: string
}

export class User {
    private email: string;
    private password: string;

    constructor({ email, password }: UserParamList) {
        this.email = email;
        this.password = password;
    }

    // Setters
    public setEmail(email: string) {
        this.email = email;
    }
    public setPassword(password: string) {
        /* Implementación de Seguridad */
        this.password = password;
    }

    // Getters
    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}