import { Book } from "../entities/Book";
import { IRepository } from "../ports/IRepository";

export class DisplayBooks {
    public queryAllBooks(iRepository: IRepository): Promise<Book[] | null> {
        return iRepository.queryAllBooks();
    }
}