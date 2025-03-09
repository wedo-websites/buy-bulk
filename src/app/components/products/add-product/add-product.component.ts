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
export class AddProductComponent {
  @Input() products: any[] = [];
  @Output() getProducts: any = new EventEmitter<any>;
  productForm: FormGroup;
  editingProductId: string | null = null
  imageUrl: string | null = null;
  defaultImage: string = 'images/products/product-default.png';
  unitsOptions: string[] = ["kg", "g", "l", "ml", "packs", "pcs", "units", "boxes", "bags"];
  imageLoading: boolean = false;
  isSaved: boolean = false;
  existingImage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private alertMessageService: AlertMessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      selling_price: ['', [Validators.required, Validators.pattern(/^[+]?\d+(\.\d{1,2})?$/), Validators.max(999999.99)]],
      text: ['', [Validators.maxLength(100)]],
      market_price: ['', [Validators.required, Validators.pattern(/^[+]?\d+(\.\d{1,2})?$/), Validators.max(999999.99)]],
      stock: ['', [Validators.maxLength(10)]],
      units: ['', Validators.pattern(/^(kg|g|l|ml|packs|pcs|units|boxes|bags)$/)],
      image: [null]
    });
  }

  editProduct(product: any) {
    this.imageUrl = product.image ? product.image : null;
    this.productForm.patchValue({
      name: product.name,
      selling_price: product.selling_price,
      text: product.text,
      market_price: product.market_price,
      stock: product.stock,
      units: product.units,
      image: null
    });

    this.editingProductId = product.id;
    this.existingImage = true;
  }

  deleteProduct(id?: string) {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = this.products.filter(product => String(product.id) !== id);
          if (id === this.editingProductId) {
            this.resetData();
          }
          this.alertMessageService.showToast('Product deleted successfully!', 'success');
        } else {
          this.alertMessageService.showToast(res.message, 'warning');
        }
      },
      error: (err) => {
        const errorMessage = err.error?.success === false ? err.error.message : err;
        this.alertMessageService.showToast(errorMessage || 'Failed to delete product.', 'error');
      }
    });
  }


  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should not exceed 5MB.");
        return;
      }

      this.imageLoading = true;
      this.productForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.imageLoading = false;
        this.existingImage = false;
      };
      reader.readAsDataURL(file);

    }
  }

  resetData() {
    this.imageUrl = null;
    this.existingImage = false;
    this.editingProductId = null;
    this.productForm.reset();
    this.productForm.patchValue({ units: '' });
  }

  onSubmit() {
    if (!this.productForm.valid) {
      this.alertMessageService.showToast('Please fill all required fields and upload an image.', 'warning');
      return;
    }

    this.isSaved = true;
    const formData = new FormData();

    Object.entries(this.productForm.value).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File && !this.existingImage) {
        formData.append(key, value);
      }
      if (key !== 'image') {
        formData.append(key, String(value));
      }
    });

    const apiCall = this.editingProductId
      ? this.productsService.updateProduct(this.editingProductId, formData)
      : this.productsService.createProduct(formData);

    apiCall.subscribe({
      next: (res) => {
        this.isSaved = false;
        const message = this.editingProductId ? 'Product updated successfully!' : 'Product added successfully!';
        if (res.success) {
          this.alertMessageService.showToast(message, 'success');
          this.resetData();
          this.getProducts.emit();
          this.isSaved = false;
        } else {
          this.alertMessageService.showToast(res.message, 'warning');
        }
      },
      error: (err) => {
        const errorMessage = err.error?.success === false ? err.error.message : err;
        this.alertMessageService.showToast(errorMessage, 'error');
        this.isSaved = false;
      }
    });
  }

}
