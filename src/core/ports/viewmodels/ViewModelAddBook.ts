import { DataSourceServer } from "../../../data/DataSourceServer";
import { Book } from "../../entities/Book";
import { AddNewBook } from "../../usecases/AddNewBook";

export default class ViewModelAddBook {

    // Persistence
    private isbn: string = "";
    private author: string = "";
    private title: string = "";
    private bookToAdd: Book = new Book({ isbn: this.isbn, author: this.author, title: this.title, description: null, price: 0 });;

    // Setters
    public setIsbn(isbn: string) {
        this.isbn = isbn;
        console.log(this.isbn);
    }
    public setAuthor(author: string) {
        this.author = author;
        console.log(this.author);
    }
    public setTitle(title: string) {
        this.title = title;
        console.log(this.title);
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
    public getBookToAdd(): Book {
        return this.bookToAdd;
    }


    // Actions
    private addNewBookUseCase = new AddNewBook();

    public createNewBook(): boolean {
        try {
            this.bookToAdd = new Book({ isbn: this.isbn, author: this.author, title: this.title, description: null, price: 0 });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async saveNewBook() {
        return await this.addNewBookUseCase.saveNewBook(this.bookToAdd, new DataSourceServer());
    }
}