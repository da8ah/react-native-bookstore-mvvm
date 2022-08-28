import { Book } from "../entities/Book";
import { IRepository } from "../ports/IRepository";

export class AddNewBook {
    public async saveNewBook(book: Book, iRepository: IRepository): Promise<boolean> {
        return await iRepository.saveNewBook(book);
    }
}