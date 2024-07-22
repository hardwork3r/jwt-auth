import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Store from './store/store';

interface State {
    store: Store;
}

const store = new Store();

export const Context = React.createContext<State>({
    store,
});

ReactDOM.render(
    <BrowserRouter>
        <Context.Provider value={{ store }}>
            <App />
        </Context.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);