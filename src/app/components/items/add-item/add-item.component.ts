import { Component } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../item/item.model';

@Component({
  selector: 'app-add-item',
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'Fried Gram / Huri',
      selling_price: '180',
      market_price: '250',
      stock: '500 KG',
      image: 'images/products/fried gram.jpg',
    },
    {
      id: '2',
      name: 'Groundnuts',
      selling_price: '150',
      market_price: '200',
      stock: '300 KG',
      image: 'images/products/Groundnuts.png',
    },
    {
      id: '3',
      name: 'Green Gram',
      selling_price: '220',
      market_price: '270',
      stock: '400 KG',
      image: 'images/products/green gram.png',
    },
    {
      id: '4',
      name: 'Black Gram',
      selling_price: '200',
      market_price: '240',
      stock: '350 KG',
      image: 'images/products/black gram.png',
    },
    {
      id: '5',
      name: 'Red Lentils',
      selling_price: '190',
      market_price: '230',
      stock: '600 KG',
      image: 'images/products/red lentils.png',
    },
    {
      id: '6',
      name: 'Chickpeas',
      selling_price: '210',
      market_price: '260',
      stock: '450 KG',
      image: 'images/products/chickpeas.png',
    },
    {
      id: '7',
      name: 'Rice Flour',
      selling_price: '80',
      market_price: '120',
      stock: '700 KG',
      image: 'images/products/rice floor.png',
    },
    {
      id: '8',
      name: 'Wheat Flour',
      selling_price: '90',
      market_price: '130',
      stock: '800 KG',
      image: 'images/products/wheat floor.png',
    },
    {
      id: '9',
      name: 'Corn Flour',
      selling_price: '100',
      market_price: '140',
      stock: '500 KG',
      image: 'images/products/corn floor.png',
    },
    {
      id: '10',
      name: 'Jaggery',
      selling_price: '250',
      market_price: '300',
      stock: '200 KG',
      image: 'images/products/jaggery.png',
    },
    {
      id: '11',
      name: 'Sugar',
      selling_price: '75',
      market_price: '110',
      stock: '1000 KG',
      image: 'images/products/suggar.png',
    },
    {
      id: '12',
      name: 'Salt',
      selling_price: '25',
      market_price: '40',
      stock: '1200 KG',
      image: 'images/products/salt.png',
    },
  ];
  
  productForm: FormGroup;
  imageUrl: string | null = null;
  defaultImage: string = 'images/products/product-default.png';
  imageLoading: boolean = false;
  isSaved: boolean = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sellingPrice: ['', [Validators.required, Validators.min(1)]],
      marketPrice: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(1)]],
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.imageLoading = false;
      };
      setTimeout(() => reader.readAsDataURL(file), 1000);
    }
  }

  resetData(){
    this.imageUrl = null;
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSaved = true;
      console.log('Product Data:', this.productForm.value);
      console.log('Uploaded Image:', this.imageUrl);

      setTimeout(() => {
        alert('Product Added Successfully!');
        this.isSaved = false;
        this.resetData();
      }, 2000);
    }
  }
}
