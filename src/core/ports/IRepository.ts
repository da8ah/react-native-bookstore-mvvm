import { Book } from "../entities/Book";

export interface IRepository {
    queryAllBooks(): Promise<Book[] | null>;
    saveNewBook(book: Book): Promise<boolean>;
}