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

    if (file) {
      formData.append('imageFile', file, file.name);
    }

    return this.http.post(Constant.API_END_Point + Constant.METHODS.CREATE_PRODUCT, formData);
  }

  updateProduct(product: any, file: File | null) {
    const formData: FormData = new FormData();
    // Remove the formData.append('id') since the id goes in the URL
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);

    if (file) {
      formData.append('imageFile', file, file.name);
    }

    // Pass the ID in the URL, not in the formData
    return this.http.put(`${Constant.API_END_Point + Constant.METHODS.UPDATE_PRODUCT}/${product.id}`, formData);
}


  deleteProduct(id: number) {
    return this.http.delete(`${Constant.API_END_Point + Constant.METHODS.DELETE_PRODUCT}/${id}`);
  }
}
