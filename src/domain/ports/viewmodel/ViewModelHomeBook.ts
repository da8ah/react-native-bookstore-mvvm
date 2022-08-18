import { DisplayBooks } from '../../usecases/DisplayBooks';
import { PersistenceQueryAllBooks } from '../../../persistence/PersistenceAtServer';

type ViewModelHomeBooksParamList = {
    _isbn: string,
    _author: string,
    _title: string,
    _price: number
}

export class BookModel implements ViewModelHomeBooksParamList {
    _isbn: string;
    _author: string;
    _title: string;
    _price: number;

    constructor(isbn: string, author: string, title: string, price: number) {
        this._isbn = isbn;
        this._author = author;
        this._title = title;
        this._price = price;
    }

    // Getters
    public getIsbn(): string {
        return this._isbn;
    }
    public getAuthor(): string {
        return this._author;
    }
    public getTitle(): string {
        return this._title;
    }
    public getPrice(): number {
        return this._price;
    }
}

export class ViewModelHomeBooks {
    private displayBooksUseCase = new DisplayBooks();
    private booksToDisplay: BookModel[] = [];

    public getDataToDisplay(): BookModel[] {
        const listBooks = this.displayBooksUseCase.queryAllBooks(new PersistenceQueryAllBooks());
        this.booksToDisplay = listBooks.map(book => new BookModel(book.getIsbn(), book.getAuthor(), book.getTitle(), book.getPrice()));
        console.log(this.booksToDisplay);
        return this.booksToDisplay;
    }
}