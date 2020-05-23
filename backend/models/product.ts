import { Variation } from './variation';

export class Product {
    skuid: string;
    title: string;
    url: string;
    original_price: number;
    sale_price: number;
    variations: Variation[];
}