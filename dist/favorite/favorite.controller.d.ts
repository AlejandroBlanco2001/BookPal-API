import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoriteController {
    private favoriteService;
    constructor(favoriteService: FavoriteService);
    getFavorites(items: number): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }[]>;
    getFavoritesFromUser(req: any): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }[] | []>;
    getFavoritesFromBook(barcode: string): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }[] | []>;
    getMostFavorites(): Promise<[] | {
        id: number;
        serial_number: string;
        barcode: string;
        reference_id: number;
        collection_id: number;
        author: string;
        book_cover: string;
        title: string;
        edition: string | null;
        dewey_code: string;
        creation_date: Date;
        isbn: string | null;
        isbn13: string | null;
        publisher: string | null;
        publish_date: Date | null;
        language: string | null;
        status: import(".prisma/client").$Enums.BookStatus;
        bibliographic_gps: string | null;
    }[]>;
    createFavorite(req: any, data: CreateFavoriteDto): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }>;
    deleteFavorite(req: any, id: string): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }>;
}
