import { Gender } from './gender';
import { Category } from './category';
import { Product } from './product';

export class Products {
    date_scraped: Date;
    gender: Gender;
    category: Category;
    products: Product[];
}