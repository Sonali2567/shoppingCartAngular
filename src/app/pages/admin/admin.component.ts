import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AdminComponent implements OnInit {

  isSidePanelVisible: boolean = false;

  productObj: any = {
    id: 0,
    name: "",
    price: 0,
    imageFile: "", // You can keep this if you plan to use it for displaying the image later
    quantity: 0,
    description: ""
  };

  productsList: any[] = [];
  selectedFile: File | null = null; // New property to hold the selected file

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.productsList = res;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0]; // Get the first selected file
    } else {
        this.selectedFile = null; // No file selected
    }
}


onSave() {
  if (this.selectedFile) { // Ensure a file is selected
      this.productService.saveProduct(this.productObj, this.selectedFile).subscribe((res: any) => {
          if (res.result) {
              alert("Product added Successfully");
              this.getProducts(); // Refresh the product list
          } else {
              alert(res.message);
          }
      }, error => {
          console.error("Error adding product:", error); // Log the error
          alert("An error occurred while adding the product.");
      });
  } else {
      alert("Please select an image file to upload.");
  }
}


  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

  private resetForm() {
    this.productObj = {
      id: 0,
      name: "",
      price: 0,
      imageFile: "",
      quantity: 0,
      description: ""
    };
   // Reset selected file
  }
}
