import { Book } from "../entities/Book";
import { IPersistenceSaveNewBook } from "../ports/IPersistence";

export class AddNewBook {
    public createNewBook() {
        throw new Error("Not implemented yet");
    }

    public saveNewBook(book: Book, iPersistenceSaveNewBook: IPersistenceSaveNewBook): boolean {
        try {
            if (iPersistenceSaveNewBook.saveNewBook(book)) return true;
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}