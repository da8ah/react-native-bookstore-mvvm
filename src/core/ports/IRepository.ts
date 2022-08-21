import { Book } from "../entities/Book";

export interface IRepository {
    queryAllBooks(): Promise<Book[]>;
    saveNewBook(book: Book): Promise<boolean>;
}