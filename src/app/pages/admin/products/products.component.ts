import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
isSidePanelVisible:boolean=false;
productObj:any={
    "productId": 0,
    "productName": "",
    "productPrice": 0,
    "productDescription": "",
    "productImageUrl": ""
  
}

constructor(private productSrv:ProductService) {

 }

openSidelPanel(){
  this.isSidePanelVisible=true;
}
closeSidePanel(){
  this.isSidePanelVisible=false;
}
}
