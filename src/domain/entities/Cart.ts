import { Book } from "./Book";

type CartParamList = {
    userName: string,
    listBooks: Book[],
    total: number
}

export class User {
    private userName: string;
    private listBooks: Book[];
    private total: number = 0;

    constructor({ userName, listBooks }: CartParamList) {
        this.userName = userName;
        this.listBooks = listBooks;
        this.calcTotal();
    }

    // Setters
    public setUserName(userName: string) {
        this.userName = userName;
    }
    public setListBooks(listBooks: Book[]) {
        this.listBooks = listBooks;
    }

    // Getters
    public getUserName(): string {
        return this.userName;
    }
    public getListBooks(): Book[] {
        return this.listBooks;
    }
    public getTotal(): number {
        // El costo de cada libro debe ser Entero Positivo
        return this.total;
    }

    public calcTotal() {
        const total = this.listBooks.reduce((accumulator, book) => {
            return accumulator + book.getPrice();
        }, 0);
        console.log(total);
        this.total = total;
    }
}