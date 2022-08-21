import { DisplayBooks } from '../../usecases/DisplayBooks';
import { DataSourceServer } from '../../../data/DataSourceServer';
import { IRepository } from '../IRepository';
import { Book } from '../../entities/Book';

export type ReactComponentObserver = () => void;

export class ViewModelHomeBooks {
    private observers: ReactComponentObserver[] = [];
    private loading: boolean = false;
    private displayBooksUseCase = new DisplayBooks();
    private repository: IRepository = new DataSourceServer();
    private data: Book[] | null = [];

    public async getDataFromServer() {
        this.loading = true;
        this.data = await this.displayBooksUseCase.queryAllBooks(this.repository);
        this.loading = false;
    }

    public isLoading(): boolean {
        console.log(this.loading);
        return this.loading;
    }

    public getBooksStored(): Book[] | null {
        return this.data;
        // return new Book({ isbn: "", author: "", title: "", description: null, price: 0 })
    }
}