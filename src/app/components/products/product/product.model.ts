export interface Product {
    id? : string;
    name : string;
    selling_price : string;
    text : string;
    market_price : string;
    stock : string;
    units : string;
    image?: Blob | string;
}