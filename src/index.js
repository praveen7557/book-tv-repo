import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { cacheEnhancer } from 'redux-cache';
import { BrowserRouter, Route } from 'react-router-dom'

import reducers from './reducers/index';
import './index.css';
import App from './components/App';

const middleWare = [thunk];
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise);
const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(...middleWare, ReduxPromise),
        cacheEnhancer()
    )
);
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/books/:id" component={App} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));