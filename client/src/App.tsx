import React, {FC, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import RegistForm from "./components/RegistForm";
import AddForm from "./components/AddForm";
import ShowProducts from "./components/ShowProducts";
import Basket from "./components/Basket";
import Profile from "./components/Profile";
import Navigate from "./components/Navigate";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import styles from './App.module.css'

const App: FC = () => {
    const {store} = useContext(Context)
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegistForm, setShowRegistForm] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [store]);

    const handleRegistButtonClick = () => {
        setShowLoginForm(false);
        setShowRegistForm(true);
    }

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
        setShowRegistForm(false);
    }

    const openNav = () => {
        const sidenav = document.getElementById("mySidenav");
        if (sidenav) {
            sidenav.style.width = "180px";
        } else {
            console.error("Element with ID 'mySidenav' not found");
        }
    }

    const closeNav = () => {
        const sidenav = document.getElementById("mySidenav");
        if (sidenav) {
            sidenav.style.width = "0";
        } else {
            console.error("Element with ID 'mySidenav' not found");
        }
    };

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth && showLoginForm) {
        return (
            <div>
                <LoginForm onRegistButtonClick={handleRegistButtonClick} />
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
                        <img src={`${process.env.PUBLIC_URL}/global.png`} alt="Logotype"/>
                    </div>
                    <h2>Market</h2>
                    <Navigate />
                    <span onClick={() => openNav()}>&#9776;</span>
                    <div id="mySidenav" className={styles.sidenav}>
                        <a href="javascript:void(0)" className={styles.closebtn} onClick={() => closeNav()}>&times;</a>
                        <Link to={"/"} onClick={() => closeNav()}>Продукты</Link>
                        <Link to={"/profile"} onClick={() => closeNav()}>Профиль</Link>
                        <Link to={"/basket"} onClick={() => closeNav()}>Корзина</Link>
                        <button className={styles.logoutBtn} onClick={() => store.logout()}>Выйти</button>
                    </div>
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