import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  public products: any[] = [];
  public grandTotal !: number;
  public discountedTotal !: number;
  constructor(private cartService:CartService) { } 
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res:any[])=>{
      this.products=res;
      this.grandTotal=this.cartService.getTotalPrice();
      this.discountedTotal=this.cartService.getDiscountedPrice();
    })
  }
removeCartItem(product:any){
  this.cartService.removeCartItem(product);
}

emptycart(){
  this.cartService.removeAllCart();
}

updateCartTotal(product: any) {
  product.total = product.price * product.quantity; 
}

updateQuantity(product: any, newQuantity: number) {
  if (newQuantity < 1) return;
  product.quantity = newQuantity;
  product.total = product.price * newQuantity;

  this.cartService.updateProductQuantity(product);
}
}
