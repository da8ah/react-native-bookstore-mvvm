import { Book } from "../entities/Book";
import { IPersistenceQueryAllBooks } from "../ports/IPersistence";

export class DisplayBooks {
    public queryAllBooks(iPersistenceQueryAllBooks: IPersistenceQueryAllBooks): Book[] {
        const listBooks: Book[] = iPersistenceQueryAllBooks.queryAllBooks();
        return listBooks;
    }
}