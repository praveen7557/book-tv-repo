import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { cacheEnhancer } from 'redux-cache';
import { BrowserRouter, Route } from 'react-router-dom'

import reducers from './reducers/index';
import './index.css';
import App from './components/App';

const middleWare = [ReduxThunk];
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise);
const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(...middleWare)
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
                <Route exact path="/tv" component={App} />
                <Route path="/tv/:id" component={App} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));