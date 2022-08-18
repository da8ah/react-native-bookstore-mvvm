import { Book } from "../domain/entities/Book";
import { IPersistenceQueryAllBooks } from "../domain/ports/IPersistence";

export class PersistenceQueryAllBooks implements IPersistenceQueryAllBooks {
    queryAllBooks(): Book[] {
        const listBooks = this.queryServer();
        return [new Book({ isbn: '0909909009', author: 'Yo', title: 'Cuentos', description: null, price: 10.00 })];
    }

    private async queryServer(
        apiString: string = 'https://expressjs-bookstore.herokuapp.com/api/books'
    ): Promise<Book[]> {
        const data = await fetch(apiString).then(res => res.json()).catch(err => console.log(err));
        console.log(data);

        return [new Book({ isbn: '0909909009', author: 'Yo', title: 'Cuentos', description: null, price: 10.00 })];
    };
}