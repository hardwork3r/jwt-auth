import $api from '../http';
import {AxiosResponse} from 'axios';
import {IPurchase} from "../models/IPurchase";

export default class PurchaseService {
    static fetchPurchase(email: string): Promise<AxiosResponse<IPurchase[]>> {
        return $api.post<IPurchase[]>(`/purchases`, { email });
    }
    static createPurchase(productData: IPurchase): Promise<AxiosResponse<IPurchase>> {
        return $api.post<IPurchase>('/addPurchase', productData);
    }
    static deletePurchase(email: string, name: string): Promise<AxiosResponse<IPurchase>> {
        return $api.post<IPurchase>('/delete', { email, name });
    }
}