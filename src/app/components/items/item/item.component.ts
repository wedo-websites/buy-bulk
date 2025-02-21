import { Component, Input } from '@angular/core';
import type { Product } from './item.model';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input({required: true}) product!:Product;
}
