import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import styles from './LoginForm.module.css'

interface LoginFormProps {
    onRegistButtonClick: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onRegistButtonClick }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    return (
        <div className={styles.formAuth}>
            <div className={styles.formTitle}>Вход</div>
            <input className={styles.textbox}
                   onChange={e => setEmail(e.target.value)}
                   value={email}
                   type="text"
                   placeholder="Адрес электронной почты"/>
            <input className={styles.textbox}
                   onChange={e => setPassword(e.target.value)}
                   value={password}
                   type="password"
                   placeholder="Пароль"/>
            <div className={styles.buttons}>
                <button className={styles.buttonLogin} onClick={() => store.login(email, password)}>
                    Войти
                </button>
                <button className={styles.buttonRegist} onClick={onRegistButtonClick}>
                    Регистрация
                </button>
            </div>
        </div>
    );
};

export default LoginForm;