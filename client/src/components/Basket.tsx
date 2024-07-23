import React, { FC, useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { IProduct } from "../models/IProduct";
import { IPurchase } from "../models/IPurchase";
import ProductService from "../services/ProductService";
import PurchaseService from "../services/PurchaseService.";
import { Context } from "../index";
import styles from './Basket.module.css'

const Basket: FC = () => {
    const { store } = useContext(Context);
    const [basketProducts, setBasketProducts] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
            fetchAndDisplayPurchases(store.user.email);
            setTotalPrice(basketProducts.reduce((acc, product) => acc + product.price, 0));
    }, [store, basketProducts]);

    const fetchAndDisplayPurchases = async (email: string) => {
        try {
            console.log('Fetching purchases for email:', email);
            const response = await PurchaseService.fetchPurchase(email);
            console.log('Purchase response:', response.data);
            const purchaseProducts = response.data.map((purchase: IPurchase) => purchase.name);
            console.log('Purchased product names:', purchaseProducts);

            const fetchedProducts = await ProductService.fetchOneProduct(purchaseProducts);
            console.log('Fetched products:', fetchedProducts.data);

            setBasketProducts(fetchedProducts.data);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };


    const handleDeleteProduct = async (email: string, name: string) => {
        const confirmDelete = window.confirm(`Вы уверены, что хотите удалить ${name} из корзины?`);

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await PurchaseService.deletePurchase(email, name);
            console.log('Product deleted:', response.data);

            setBasketProducts(prevProducts => {
                const updatedProducts = prevProducts.filter(product => product.name !== name);
                return updatedProducts;
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handlePayAllProduct = async (email: string)=> {
        const confirmPay = window.confirm(`Вы уверены, что хотите оплатить ${basketProducts.length} товар(а) из корзины?`);

        if (!confirmPay) {
            return;
        }

        try {
            for (const product of basketProducts) {
                await PurchaseService.deletePurchase(email, product.name);
                await ProductService.productPaid(product.name);
            }
            setBasketProducts([]); // Очищаем корзину
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    }

    return (
        <div>
            <div className={styles.basketList}>
                <div className={styles.basketTitle}>Корзина</div>
                <h3 className={styles.emptyLabel}>Ваша корзина пуста.</h3>
                {basketProducts.map((product) => (
                    <div key={product.name} className={styles.product}>
                        <div className={styles.productPreview}>
                            <img src={product.preview} alt="Preview"/>
                        </div>
                        <div className={styles.basketInfo}>
                            <div>{product.name}</div>
                            <div className={styles.discription}>{product.description}</div>
                        </div>
                        <div className={styles.buttons}>
                            <div>{product.price} рублей</div>
                            <input
                                className={styles.buttonDelete}
                                type="submit"
                                value="Удалить"
                                onClick={() => handleDeleteProduct(store.user.email, product.name)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.payPanel}>
                <div className={styles.quantityInfo}>К покупке
                    <div className={styles.quantity}>{basketProducts.length} товар(а)</div>
                </div>
                <div className={styles.total}>Итого: {totalPrice} рублей</div>
                <input
                    type="submit"
                    className={styles.pay}
                    value="Оплатить"
                    onClick={() => handlePayAllProduct(store.user.email)}
                />
            </div>
        </div>
    );
};

export default observer(Basket);