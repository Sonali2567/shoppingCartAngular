import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

isSidePanelVisible:boolean=false;
productObj:any={
    "id": 0,
    "name": "",
    "price": 0,
    "imageUrl": ""
  
}

productsList:any[]=[];

constructor(public productSrv:ProductService) {

 }

 ngOnInit(): void {
    this.getProducts();
 }

 getProducts(){
  this.productSrv.getProducts().subscribe((res:any)=>{
    console.log("this is res",res);
    this.productsList = res;
  })
 }



openSidelPanel(){
  this.isSidePanelVisible=true;
}
closeSidePanel(){
  this.isSidePanelVisible=false;
}
}
