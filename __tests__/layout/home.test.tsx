import App from '../../App';
import React from 'react';
import viewModelHomeBooks from '../../src/core/ports/viewmodels/ViewModelHomeBooks';
import { Book } from '../../src/core/entities/Book';
import { act, create } from 'react-test-renderer';

const data: Book[] = [
    new Book({
        isbn: "9780141988511",
        author: "Peterson, Jordan B.",
        title: "12 Rules for Life: An Antidote to Chaos",
        description: "",
        price: 99.99 // Randomly generated from Server
    })
];


describe('<HomeBooksScreen />', () => {

    let originalFetch: any;
    let rootComp: any;
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(data)
            }),
        ) as jest.Mock;
        rootComp = create(<App />).root;
    });

    afterEach(() => {
        jest.clearAllMocks();
        global.fetch = originalFetch;
    });

    it('should render home: <Layout />', async () => {
        expect(rootComp).toBeDefined();

        let home: any;
        await act(async () => {
            home = await rootComp.findByProps({ testID: 'home' });
        });
        expect(home).toBeDefined();
    });

    it('should fetch data and render it: renderBookItem()', async () => {
        expect(rootComp).toBeDefined();

        jest.spyOn(viewModelHomeBooks, 'getBooksStored').mockReturnValueOnce(data);
        const dataMocked = viewModelHomeBooks.getBooksStored();
        console.log(dataMocked);
        expect(dataMocked).toBe(data);

        let list: any;
        await act(async () => {
            list = rootComp.findByProps({ testID: 'listBooks' }).props;
            await list.onRefresh();
            await viewModelHomeBooks.updateBooks();
        });

        let books = rootComp.findByProps({ testID: 'bookItem' });
        console.log(books);
        expect(books).toBeDefined();
    });

});