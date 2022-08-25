import { DataSourceServer } from "../../../data/DataSourceServer";
import { Book } from "../../entities/Book";
import { AddNewBook } from "../../usecases/AddNewBook";

export default class ViewModelAddBook {

    // Persistence
    private isbn: string = "";
    private author: string = "";
    private title: string = "";

    // Setters
    public setIsbn(isbn: string) {
        this.isbn = isbn;
        console.log(this.isbn);
    }
    public setAuthor(author: string) {
        this.author = author;
    }
    public setTitle(title: string) {
        this.title = title;
    }

    // Getters
    public getIsbn(): string {
        return this.isbn;
    }
    public getAuthor(): string {
        return this.author;
    }
    public getTitle(): string {
        return this.title;
    }

    // Actions
    private addNewBookUseCase = new AddNewBook();

    public createNewBook() {
        let sampleRegEx: RegExp = /[\d]{10}|[\d]{13}/;
        console.log("ISBN: " + sampleRegEx.test(this.isbn));
    }

    public async saveNewBook() {
        const book = new Book({ isbn: this.isbn, author: this.author, title: this.title, description: null, price: 0 });
        return await this.addNewBookUseCase.saveNewBook(book, new DataSourceServer());
    }
}