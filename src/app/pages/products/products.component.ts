import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Toast } from 'bootstrap';  // You can remove this if using the global declaration
declare var bootstrap: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isSidePanelVisible: boolean = false;
  productObj: any = {
    "id": 0,
    "name": "",
    "price": 0,
    "imageUrl": ""
  };

  productsList: any[] = [];
  cartItemCount: number = 0;
  cartTotalPrice: number = 0;
  toastMessage: string = '';  
  productName: string = '';
  constructor(public productSrv: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();

    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    this.cartService.getCartTotalPrice().subscribe(total => {
      this.cartTotalPrice = total;
    });
  }

  getProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      this.productsList = res;
      
      this.productsList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  addtocart(product: any) {
    this.cartService.addToCart(product);
    this.productName = product.name;
   

    const toastElement = document.getElementById('cart-toast');
    const toast = new bootstrap.Toast(toastElement);  
    toast.show(); 

    
    setTimeout(() => {
      toast.hide();
    }, 2000);
  }

  updateCartTotal(product: any) {
    product.total = product.price * product.quantity;
    this.cartService.updateProductQuantity(product);  
    this.cartService.updateCartData();  
  }
}
