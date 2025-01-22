import { Component } from '@angular/core';
import { ItemComponent } from "./item/item.component";
import type { Item } from './item/item.model';

@Component({
  selector: 'app-items',
  imports: [ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  itemsArray: Item[] = [
    {
      title: 'Fried Gram / Huri',
      sell_price: '$ 180',
      market_price: '$ 250',
      stock_avail: '500 KG',
      image: 'images/products/fried gram.jpg'
    },
    {
      title: 'Groundnuts',
      sell_price: '$ 150',
      market_price: '$ 200',
      stock_avail: '300 KG',
      image: 'images/products/Groundnuts.png'
    },
    {
      title: 'Green Gram',
      sell_price: '$ 220',
      market_price: '$ 270',
      stock_avail: '400 KG',
      image: 'images/products/green gram.png'
    },
    {
      title: 'Black Gram',
      sell_price: '$ 200',
      market_price: '$ 240',
      stock_avail: '350 KG',
      image: 'images/products/black gram.png'
    },
    {
      title: 'Red Lentils',
      sell_price: '$ 190',
      market_price: '$ 230',
      stock_avail: '600 KG',
      image: 'images/products/red lentils.png'
    },
    {
      title: 'Chickpeas',
      sell_price: '$ 210',
      market_price: '$ 260',
      stock_avail: '450 KG',
      image: 'images/products/chickpeas.png'
    },
    {
      title: 'Rice Flour',
      sell_price: '$ 80',
      market_price: '$ 120',
      stock_avail: '700 KG',
      image: 'images/products/rice floor.png'
    },
    {
      title: 'Wheat Flour',
      sell_price: '$ 90',
      market_price: '$ 130',
      stock_avail: '800 KG',
      image: 'images/products/wheat floor.png'
    },
    {
      title: 'Corn Flour',
      sell_price: '$ 100',
      market_price: '$ 140',
      stock_avail: '500 KG',
      image: 'images/products/corn floor.png'
    },
    {
      title: 'Jaggery',
      sell_price: '$ 250',
      market_price: '$ 300',
      stock_avail: '200 KG',
      image: 'images/products/jaggery.png'
    },
    {
      title: 'Sugar',
      sell_price: '$ 75',
      market_price: '$ 110',
      stock_avail: '1000 KG',
      image: 'images/products/suggar.png'
    },
    {
      title: 'Salt',
      sell_price: '$ 25',
      market_price: '$ 40',
      stock_avail: '1200 KG',
      image: 'images/products/salt.png'
    }
  ];
  
}
