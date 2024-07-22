import $api from '../http';
import {Axios, AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IProduct} from "../models/IProduct";

export default class ProductService {
    static fetchProduct(): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>('/products')
    }

    static fetchOneProduct(name: string[]): Promise<AxiosResponse<IProduct[]>> {
        return $api.post<IProduct[]>(`/product`, { name });
    }

    static createProduct(productData: IProduct): Promise<AxiosResponse<IProduct>> {
        return $api.post<IProduct>('/saveProduct', productData);
    }

    static productPaid(name: string): Promise<AxiosResponse<IProduct>> {
        return $api.post<IProduct>('/paid', {name});
    }
}