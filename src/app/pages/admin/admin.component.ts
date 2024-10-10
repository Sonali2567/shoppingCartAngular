import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  isSidePanelVisible: boolean = false;

  productObj: any = {
    id: 0,  // Include the product ID for update functionality
    name: "",
    price: 0,
    quantity: 0,
    description: ""
  };

  productsList: any[] = [];
  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.productsList = res;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSave() {
    if (this.productObj.id) {
      // Update existing product
      this.productService.updateProduct(this.productObj, this.selectedFile).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Product updated successfully");
            this.getProducts(); // Refresh the product list
            this.resetForm(); // Reset form after update
          } else {
            alert(res.message);
          }
        },
        error: (error: any) => {
          console.error("Error updating product:", error);
          alert("An error occurred while updating the product.");
        }
      });
    } else {
      // Save new product
      this.productService.saveProduct(this.productObj, this.selectedFile).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Product added successfully");
            this.getProducts(); // Refresh the product list
            this.resetForm(); // Reset form after adding
          } else {
            alert(res.message);
          }
        },
        error: (error: any) => {
          console.error("Error adding product:", error);
          alert("An error occurred while adding the product.");
        }
      });
    }
  }

  onUpdate(product: any) {
    this.productObj = { ...product };  // Copy product details for editing
    this.openSidePanel();
  }

  onDelete(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Product deleted successfully");
            this.getProducts(); // Refresh the product list after deletion
          } else {
            alert(res.message);
          }
        },
        error: (error: any) => {
          console.error("Error deleting product:", error);
          alert("An error occurred while deleting the product.");
        }
      });
    }
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
    this.resetForm();  // Reset form when closing the panel
  }

  private resetForm() {
    this.productObj = {
      id: 0,
      name: "",
      price: 0,
      quantity: 0,
      description: ""
    };
    this.selectedFile = null;
  }
}
