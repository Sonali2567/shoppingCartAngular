import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(Constant.API_END_Point + Constant.METHODS.GET_ALL_PRODUCT);
  }

  saveProduct(product: any, file: File) {
    const formData: FormData = new FormData();
   // formData.append('id', product.id.toString());
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);
    formData.append('imageFile', file, file.name);  // Append the image file
  
    return this.http.post(Constant.API_END_Point + Constant.METHODS.CREATE_PRODUCT, formData);
  }
  
}
