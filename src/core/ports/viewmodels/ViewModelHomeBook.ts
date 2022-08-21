import { DisplayBooks } from '../../usecases/DisplayBooks';
import { DataSourceServer } from '../../../data/DataSourceServer';
import { IRepository } from '../IRepository';
import { Book } from '../../entities/Book';

export type ReactComponentObserver = () => void;

export class ViewModelHomeBooks {
    private observers: ReactComponentObserver[] = [];
    private loading: boolean = true;
    private displayBooksUseCase = new DisplayBooks();
    private repository: IRepository = new DataSourceServer();
    private data: Book[] = [];

    public async getDataFromServer() {
        this.loading = true;
        this.data = await this.displayBooksUseCase.queryAllBooks(this.repository);
        console.log(this.data);
        this.loading = false;
    }

    public isLoading(): boolean {
        return this.loading;
    }

    public getBooksStored(): Book[] {
        // return [new Book({ isbn: "", author: "", title: "", description: null, price: 0 })];
        return this.data;
    }
}