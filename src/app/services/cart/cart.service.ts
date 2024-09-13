import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];
  public productsList = new BehaviorSubject<any[]>([]);
  public cartTotalPrice = new BehaviorSubject<number>(0);
  public cartItemCount = new BehaviorSubject<number>(0);

  constructor() { }

  getProducts() {
    return this.productsList.asObservable();
  }

  setProduct(product: any) {
    const productIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);

    if (productIndex !== -1) {
      this.cartItemList[productIndex].quantity += product.quantity;
      this.cartItemList[productIndex].total = this.cartItemList[productIndex].price * this.cartItemList[productIndex].quantity;
    } else {
      this.cartItemList.push(product);
    }

    this.productsList.next(this.cartItemList);
    this.updateCartData();
  }

  updateProductQuantity(product: any) {
    const itemIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);
    if (itemIndex !== -1) {
      this.cartItemList[itemIndex].quantity = product.quantity;
      this.cartItemList[itemIndex].total = product.price * product.quantity;
      this.updateCartData(); 
    }
  }

  
  updateCartData() {
    const totalQuantity = this.cartItemList.reduce((count, item) => count + item.quantity, 0);
    const totalPrice = this.cartItemList.reduce((total, item) => total + item.total, 0);

    this.cartItemCount.next(totalQuantity);
    this.cartTotalPrice.next(totalPrice);
    this.productsList.next(this.cartItemList);
  }

  
  addToCart(product: any) {
    this.setProduct(product);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      
      grandTotal += a.total;
      if(grandTotal>4499){
        grandTotal = grandTotal-(grandTotal*0.1);
        grandTotal = parseFloat(grandTotal.toFixed(2));
    }
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== product.id);
    this.productsList.next(this.cartItemList);
    this.updateCartData();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productsList.next(this.cartItemList);
    this.updateCartData();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  getCartTotalPrice() {
    return this.cartTotalPrice.asObservable();
  }

 
}

