import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from "./product/product.component";
// import type { Product } from './product/product.model';
import { ProductsService } from "../../services/products.service";


@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
 
  productService = inject(ProductsService);
  products: any[] = [];

  ngOnInit(): void {
      this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {

          this.products = res.data.products;          
        }
      },
      error: (err) => console.error('getAllProducts failed', err.error.message),
    });
  }
  
}
