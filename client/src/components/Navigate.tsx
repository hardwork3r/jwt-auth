import React, {FC, useContext} from 'react';
import styles from "../App.module.css";
import {Link} from "react-router-dom";
import {Context} from "../index";

const Navigate: FC = () => {
    const { store } = useContext(Context);

    return (
        <div className={styles.buttonContainer}>
            <Link to={"/"} className={styles.links}>Продукты</Link>
            <Link to={"/profile"} className={styles.links}>Профиль</Link>
            <Link to={"/basket"} className={styles.buttonBasket}>Корзина</Link>
            <button className={styles.buttonLogout} onClick={() => store.logout()}>Выйти</button>
        </div>
    )
};

export default Navigate;