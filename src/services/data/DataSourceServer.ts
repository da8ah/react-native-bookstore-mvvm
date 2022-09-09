import { Book } from "../../core/entities/Book";
import { IRepository } from "../../core/ports/IRepository";
import config from "../config";

export class DataSourceServer implements IRepository {

    private apiURL: string = config.URL.REPOSITORY;

    constructor(apiURL?: string) {
        if (apiURL) this.apiURL = apiURL;
    }

    async queryAllBooks(): Promise<Book[] | null> {
        try {
            let data: Book[] = [];
            data = await fetch(this.apiURL)
                .then(res => res.json())
                .then(data => {
                    return data.map((item: any) => {
                        const isbn = item.isbn.toString();
                        const author = item.author.toString();
                        const title = item.title.toString();
                        const description = null;
                        const price = Number.parseFloat((Math.round((Math.random() * 10 + 1)) * 10 + 9.99).toFixed(2));
                        return new Book({ isbn, author, title, description, price });
                    });
                });
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async saveNewBook(book: Book): Promise<boolean> {
        try {
            let confirmation: boolean = false;
            let bodyContent = JSON.stringify({
                isbn: book.getIsbn(),
                author: book.getAuthor(),
                title: book.getTitle()
            });

            confirmation = await fetch(this.apiURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyContent
            })
                .then(res => res.ok);
            return confirmation;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}