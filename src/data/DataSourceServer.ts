import { Book } from "../core/entities/Book";
import { IRepository } from "../core/ports/IRepository";

export class DataSourceServer implements IRepository {

    async queryAllBooks(
        apiString: string = 'https://expressjs-bookstore.herokuapp.com/api/books'
    ): Promise<Book[]> {
        try {
            let data: Book[] = [];
            data = await fetch(apiString)
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
            return [new Book({ isbn: "", author: "", title: "", description: null, price: 0 })];
        }
    }

    saveNewBook(book: Book): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}