import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { AlertMessageService } from '../../../services/alert-message.service';

@Component({
  selector: 'app-add-product',
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent{
  @Input() products: any[] = [];
  @Output() getProducts: any = new EventEmitter<any>;
  productForm: FormGroup;
  imageUrl: string | null = null;
  defaultImage: string = 'images/products/product-default.png';
  imageLoading: boolean = false;
  isSaved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private alertMessageService : AlertMessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      selling_price: ['', [Validators.required, Validators.min(1)]],
      market_price: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      image: [null],
    });
  }

  editProduct(product: any) {
    console.log('Edit:', product);
  }

  deleteProduct(id?: string) {
    if (!id) return;
    this.products = this.products.filter(product => String(product.id) !== id);
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageLoading = true;
      this.productForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.imageLoading = false;
      };
      reader.readAsDataURL(file);
    }
  }

  resetData() {
    this.imageUrl = null;
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSaved = true;
      const formData = new FormData();
      Object.entries(this.productForm.value).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      this.productsService.createProduct(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.isSaved = false;
            this.alertMessageService.showToast('Product added successfully!', 'success');
            this.resetData();
            this.getProducts.emit();
          }else {
            this.alertMessageService.showToast(res.message, 'warning');
          }
        },
        error: (err) => {
          if (err.error && err.error.success === false) {
            this.alertMessageService.showToast(err.error.message, 'warning');
          } else {
            this.alertMessageService.showToast(err, 'error');
          }
          this.isSaved = false;
        }
      });
    } else {
      this.alertMessageService.showToast('Please fill all required fields and upload an image.', 'warning');
    }
  }
}
