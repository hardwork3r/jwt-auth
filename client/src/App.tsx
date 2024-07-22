import React, {FC, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import RegistForm from "./components/RegistForm";
import AddForm from "./components/AddForm";
import ShowProducts from "./components/ShowProducts";
import Basket from "./components/Basket";
import Profile from "./components/Profile";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import styles from './App.module.css'

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegistForm, setShowRegistForm] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    const handleRegistButtonClick = () => {
        setShowLoginForm(false);
        setShowRegistForm(true);
    }

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
        setShowRegistForm(false);
    }

    async function getUsers() {
        try {
            const response = await UserService.fetchUser()
            setUsers(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth && showLoginForm) {
        return (
            <div>
                <LoginForm onRegistButtonClick={handleRegistButtonClick} />
                {/*<button onClick={getUsers}>Получить список пользователей</button>*/}
            </div>
        )
    }

    if (showRegistForm) {
        return (
            <div>
                <RegistForm onLoginButtonClick={handleLoginButtonClick}/>
            </div>
        )
    }

    return (
        <div className="App">
            <Router>
                <header>
                    <div className={styles.image}>
                        <img src={`${process.env.PUBLIC_URL}/global.png`} alt="My Image" />
                    </div>
                    <h2>Market</h2>
                    <div className={styles.buttonContainer}>
                        <Link to={"/"} className={styles.links}>Продукты</Link>
                        <Link to={"/profile"} className={styles.links}>Профиль</Link>
                        <Link to={"/basket"} className={styles.buttonBasket}>Корзина</Link>
                        <button className={styles.buttonLogout} onClick={() => store.logout()}>Выйти</button>
                    </div>
                    {users.map(user =>
                        <div key={user.email}>{user.email}</div>
                    )}
                </header>
                <Switch>
                    <Route exact path="/" component={ShowProducts}/>
                    <Route exact path="/add" component={AddForm}/>
                    <Route exact path="/basket" component={Basket}/>
                    <Route exact path="/profile" component={Profile}/>
                </Switch>
            </Router>
        </div>
    );
}

export default observer(App);