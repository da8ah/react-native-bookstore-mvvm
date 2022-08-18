import { Book } from "../entities/Book";

export interface IPersistenceQueryAllBooks {
    queryAllBooks(): Book[];
}

export interface IPersistenceSaveNewBook {
    saveNewBook(book: Book): boolean;
}