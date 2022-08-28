import { DataSourceServer } from "../../../data/DataSourceServer";
import { Book } from "../../entities/Book";
import { AddNewBook } from "../../usecases/AddNewBook";

export default class ViewModelAddBook {

    // Persistence
    private isbn: string = "";
    private author: string = "";
    private title: string = "";
    private inputsChecked: boolean = false;
    private bookToAdd: Book = new Book({ isbn: this.isbn, author: this.author, title: this.title, description: null, price: 0 });
    private bookSaved: boolean = false;

    // Setters
    public setIsbn(isbn: string) {
        this.isbn = isbn;
    }
    public setAuthor(author: string) {
        this.author = author;
    }
    public setTitle(title: string) {
        this.title = title;
    }
    public setInputsCheck(validationStatus: boolean) {
        this.inputsChecked = validationStatus;
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
    public getInputsCheckedStatus(): boolean {
        return this.inputsChecked;
    }
    public getBookToAdd(): Book {
        return this.bookToAdd;
    }
    public getBookSavedStatus(): boolean {
        return this.bookSaved;
    }

    // Actions
    private addNewBookUseCase = new AddNewBook();

    public createNewBook(): boolean {
        try {
            if (this.inputsChecked) {
                this.bookToAdd = new Book({ isbn: this.isbn, author: this.author, title: this.title, description: null, price: 0 });
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async saveNewBook() {
        if (this.inputsChecked)
            this.bookSaved = await this.addNewBookUseCase.saveNewBook(
                this.bookToAdd,
                new DataSourceServer()
            );
    }
}