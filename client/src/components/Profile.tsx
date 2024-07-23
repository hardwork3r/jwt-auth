import React, { FC, useContext } from 'react';
import { observer } from "mobx-react-lite";
import {Context} from "../index";
import styles from "./Profile.module.css"

const Profile: FC = () => {
    const {store} = useContext(Context)

    return (
        <div className={styles.profileInfo}>
            <h2>Профиль</h2>
            <h4>Статус:<strong>{store.user.isActivated ? 'аккаунт активирован' : 'аккаунт не активирован'}</strong></h4>
            <h4>Email:<strong>{store.user.email}</strong></h4>
        </div>
    );
}

export default observer(Profile);