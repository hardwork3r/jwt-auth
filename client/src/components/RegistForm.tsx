import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import styles from './RegistForm.module.css'

interface RegistFormProps {
    onLoginButtonClick: () => void;
}

const RegistForm: FC<RegistFormProps> = ({ onLoginButtonClick }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const {store} = useContext(Context)

    const handleRegistClick = () => {
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
            store.registration(email, password);
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordMismatch(false);
    }

    return (
        <div className={styles.formAuth}>
            <div className={styles.formTitle}>Регистрация</div>
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
            <input className={`${styles.confirmPassword} ${passwordMismatch ? styles.error : ''}`}
                   onChange={handleConfirmPasswordChange}
                   value={confirmPassword}
                   type="password"
                   placeholder="Подтвердите пароль"/>
            <div className={styles.buttons}>
                <button className={styles.buttonRegist} onClick={handleRegistClick}>
                    Регистрация
                </button>
                <button className={styles.buttonLogin} onClick={onLoginButtonClick}>
                    Войти
                </button>
            </div>
        </div>
    );
};

export default RegistForm;