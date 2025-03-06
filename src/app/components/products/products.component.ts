import { Component } from '@angular/core';
import { ProductComponent } from "./product/product.component";
import type { Product } from './product/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: 'Fried Gram / Huri',
      selling_price: '₹ 180',
      market_price: '₹ 250',
      stock: '500 KG',
      image: 'images/products/fried gram.jpg'
    },
    {
      name: 'Groundnuts',
      selling_price: '₹ 150',
      market_price: '₹ 200',
      stock: '300 KG',
      image: 'images/products/Groundnuts.png'
    },
    {
      name: 'Green Gram',
      selling_price: '₹ 220',
      market_price: '₹ 270',
      stock: '400 KG',
      image: 'images/products/green gram.png'
    },
    {
      name: 'Black Gram',
      selling_price: '₹ 200',
      market_price: '₹ 240',
      stock: '350 KG',
      image: 'images/products/black gram.png'
    },
    {
      name: 'Red Lentils',
      selling_price: '₹ 190',
      market_price: '₹ 230',
      stock: '600 KG',
      image: 'images/products/red lentils.png'
    },
    {
      name: 'Chickpeas',
      selling_price: '₹ 210',
      market_price: '₹ 260',
      stock: '450 KG',
      image: 'images/products/chickpeas.png'
    },
    {
      name: 'Rice Flour',
      selling_price: '₹ 80',
      market_price: '₹ 120',
      stock: '700 KG',
      image: 'images/products/rice floor.png'
    },
    {
      name: 'Wheat Flour',
      selling_price: '₹ 90',
      market_price: '₹ 130',
      stock: '800 KG',
      image: 'images/products/wheat floor.png'
    },
    {
      name: 'Corn Flour',
      selling_price: '₹ 100',
      market_price: '₹ 140',
      stock: '500 KG',
      image: 'images/products/corn floor.png'
    },
    {
      name: 'Jaggery',
      selling_price: '₹ 250',
      market_price: '₹ 300',
      stock: '200 KG',
      image: 'images/products/jaggery.png'
    },
    {
      name: 'Sugar',
      selling_price: '₹ 75',
      market_price: '₹ 110',
      stock: '1000 KG',
      image: 'images/products/suggar.png'
    },
    {
      name: 'Salt',
      selling_price: '₹ 25',
      market_price: '₹ 40',
      stock: '1200 KG',
      image: 'images/products/salt.png'
    }
  ];
  
}
