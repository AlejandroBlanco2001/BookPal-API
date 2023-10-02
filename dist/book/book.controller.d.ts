import { BookService } from './book.service';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getBooks(params: any): {
        items: Promise<{
            book_id: string;
            reference_id: string;
            author: string;
            original_title: string | null;
            publish_date: Date | null;
        }[]>;
        status: string;
        message: string;
    };
}
