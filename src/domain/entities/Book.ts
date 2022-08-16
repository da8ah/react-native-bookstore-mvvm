type BookParamList = {
    isbn: string,
    author: string,
    title: string,
    description: string | null,
    price: number
}

export class Book {
    private isbn: string;
    private author: string;
    private title: string;
    private description: string | null;
    private price: number = 0;

    constructor({ isbn, author, title, description, price }: BookParamList) {
        this.isbn = isbn;
        this.author = author;
        this.title = title;
        this.description = description;
        this.setPrice(price);
    }

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
    public setDescription(description: string) {
        if (description) this.description = description;
    }
    public setPrice(price: number) {
        if (price >= 0) this.price = price;
        this.price = 0;
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
    public getDescription(): string | null {
        return this.description;
    }
    public getPrice(): number {
        return this.price;
    }
}