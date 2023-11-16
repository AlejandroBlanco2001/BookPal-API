import { RatingService } from './rating.service';
import { Rating as RatingModel } from '@prisma/client';
import CreateRatingDTO from './dto/create-rating.dto';
import UpdateRatingDTO from './dto/update-rating.dto';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    getRatingByID(id: number): Promise<RatingModel | null>;
    getRatings(): Promise<RatingModel[]>;
    getRatingsForBook(book_id: string): Promise<RatingModel[]>;
    getRatingsForUser(user_id: number): Promise<RatingModel[]>;
    createRating(req: any, data: CreateRatingDTO): Promise<any>;
    updateRating(req: any, data: UpdateRatingDTO, id: number): Promise<any>;
}
