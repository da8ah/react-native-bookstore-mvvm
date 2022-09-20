import { DisplayBooks } from '../../usecases/DisplayBooks';
import { DataSourceServer } from '../../../services/data/DataSourceServer';
import { IRepository } from '../IRepository';
import { Book } from '../../entities/Book';

export type BooksObserver = (books: Book[]) => void;

class ViewModelHomeBooks {
    private observer: BooksObserver | null = null;
    private displayBooksUseCase = new DisplayBooks();
    private repository: IRepository = new DataSourceServer();
    private data: Book[] | null = [];

    public attach(observer: BooksObserver) {
        this.observer = observer;
    }

    public detach() {
        this.observer = null;
    }

    public async updateBooks() {
        await this.getDataFromServer();
        if (this.observer && this.data) this.observer(this.data);
    }

    public async getDataFromServer() {
        this.data = await this.displayBooksUseCase.queryAllBooks(this.repository);
    }

    public getBooksStored(): Book[] | null {
        return this.data;
        // return new Book({ isbn: "", author: "", title: "", description: null, price: 0 })
    }
}

const viewModelHomeBooks = new ViewModelHomeBooks();

export default viewModelHomeBooks;