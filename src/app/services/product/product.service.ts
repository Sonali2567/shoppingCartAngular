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

  saveProduct(product: any, file: File | null) {
    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);

    // Append the selected file to the FormData
    if (file) {
        formData.append('imageFile', file, file.name);
    }

    return this.http.post(Constant.API_END_Point + Constant.METHODS.CREATE_PRODUCT, formData);
}


}
