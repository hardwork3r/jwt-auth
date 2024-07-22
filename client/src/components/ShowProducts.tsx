import React, {FC, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {IProduct} from "../models/IProduct";
import styles from "./ShowProducts.module.css";
import ProductService from "../services/ProductService";
import PurchaseService from "../services/PurchaseService.";
import {Context} from "../index";

const ShowProducts: FC = () => {
    const {store} = useContext(Context)
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await ProductService.fetchProduct();
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.log('Данные о продуктах не являются массивом.');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const addToCart = async (product: IProduct) => {
        const confirmAdd = window.confirm(`Вы уверены, что хотите добавить ${product.name} в корзину?`);
        if (!confirmAdd) {
            return;
        }
        try {
            await PurchaseService.createPurchase({ email: store.user.email, name: product.name });
            console.log('Продукт добавлен в корзину:', product.name);
        } catch (error) {
            console.error('Ошибка при добавлении продукта в корзину:', error);
        }
    };

    return (
        <div className={styles.productContainer}>
            <div className={styles.addProduct}>
                <Link to="/add" className={styles.addLabel}>Добавить +</Link>
            </div>
            {products.map((product) => (
                <div key={product.name} className={styles.product}>
                    <div className={styles.preview}>
                        <img src={`${product.preview}`} alt="Preview"/>
                    </div>
                    <div className={styles.productInfo}>
                        <div>{product.name}</div>
                        <div className={styles.description}>{product.description}</div>
                        <div>{product.price} рублей</div>
                    </div>
                    <input className={styles.button}
                           type="submit"
                           value="В корзину"
                           onClick={() => addToCart(product)}
                    />
                </div>
            ))}
        </div>
    );
};

export default observer(ShowProducts);