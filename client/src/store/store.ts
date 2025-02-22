import {IUser} from "../models/IUser";
import {IProduct} from "../models/IProduct";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    products: IProduct[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            alert(e.response?.data?.message || 'Ошибка авторизации. Попробуйте еще раз.');
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            alert(e.response?.data?.message || 'Ошибка регистрации. Попробуйте еще раз.');
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response)
            localStorage.removeItem("token");
            this.setAuth(false)
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}