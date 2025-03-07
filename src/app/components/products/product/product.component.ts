import { Component, Input } from '@angular/core';
import type { Product } from './product.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({required: true}) product!:Product;
  defaultImage: string = 'images/products/product-default.png';
}
