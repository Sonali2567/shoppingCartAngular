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
   // id: 0,
    name: "",
    price: 0,
  //  imageFile: "", // You can keep this if you plan to use it for displaying the image later
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.selectedFile = file;
    }
}


onSave() {
  // Call the save method with the selected file
  this.productService.saveProduct(this.productObj, this.selectedFile).subscribe({
      next: (res: any) => {
          if (res.result) {
              alert("Product added Successfully");
              this.getProducts(); // Refresh the product list
              this.resetForm(); // Reset the form after saving
          } else {
              alert(res.message);
          }
      },
      error: (error: any) => {
          console.error("Error adding product:", error); // Log the error
          alert("An error occurred while adding the product.");
      },
      complete: () => {
          console.log("Product save request completed."); // Optional completion callback
      }
  });
}

onUpdate(product: any) {
  this.productObj=product;
  this.openSidePanel();
}

onDelete(product: any) {
}



  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

  private resetForm() {
    this.productObj = {
     // id: 0,
      name: "",
      price: 0,
    //  imageFile: "",
      quantity: 0,
      description: ""
    };
   // Reset selected file
  }
}
