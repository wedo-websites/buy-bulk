import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductComponent } from "../../components/products/add-product/add-product.component";
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  imports: [AddProductComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  productService = inject(ProductsService);
  authService = inject(AuthService);
  router = inject(Router);
  products: any[] = [];

  constructor(){
    this.getAllProducts(); 
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.products = res.data.products;          
        }
      },
      error: (err) => console.error('Login failed', err.error.message),
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
