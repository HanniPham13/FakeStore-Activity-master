import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../../product.model';  // Import Product from the correct path

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  limit: number = 5;
  sortBy: string = 'price';
  selectedCategory: string = '';
  categories: string[] = [];  // Assuming you'll fetch categories
  apiUrl = 'https://fakestoreapi.com/products'; // Set your API URL here

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: [''],
      price: [''],
      description: [''],
      category: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    // Assuming this is how you'll get categories
    // Replace this with actual implementation
    this.productService.getCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
        console.log('Categories fetched:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  getProducts(): void {
    const url = `${this.apiUrl}?limit=${this.limit}&sort=${this.sortBy}&category=${this.selectedCategory}`;
    console.log('Fetching products from URL:', url);
    this.productService.getProducts(url).subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Products fetched:', this.products);
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onLimitChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.limit = +selectElement.value;
    console.log('Limit changed to:', this.limit);
    this.getProducts();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value;
    console.log('Sort by changed to:', this.sortBy);
    this.getProducts();
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    console.log('Category changed to:', this.selectedCategory);
    this.getProducts();
  }

  onDelete(id: number): void {
    console.log('Deleting product with ID:', id);
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
        console.log('Product deleted successfully');
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }

  onSubmit(): void {
    const newProduct: Product = this.productForm.value;
    console.log('Adding new product:', newProduct);
    this.productService.createProduct(newProduct).subscribe(
      (product: Product) => {
        this.products.push(product);
        this.productForm.reset();
        console.log('Product added successfully:', product);
      },
      (error) => {
        console.error('Error creating product', error);
      }
    );
  }
}
