export interface Product {
    id? : string;
    name : string;
    selling_price : string;
    market_price : string;
    stock : string;
    image?: Blob | string;
}