import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) {}
    getProducts(){
      return this.http.get(Constant.API_END_Point+Constant.METHODS.GET_ALL_PRODUCT);
      
        }  

}
