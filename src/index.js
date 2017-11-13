import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { cacheEnhancer } from 'redux-cache';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers/index';
import './index.css';
import App from './components/App';
import About from './components/About';
import NoMatch from './components/NoMatch';
import TVBox from './components/tvBox';
import Box from './components/box';

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
                <Route component={App} />
                <Switch>
                    <Route key="1" exact path="/" component={TVBox} />
                    <Route key="2" path="/tv/:id" component={TVBox} />
                    <Route key="3" exact path="/books" component={Box} />
                    <Route key="4" path="/books/:id" component={Box} />
                    <Route key="5" path="/about" component={About} />
                    <Route key="6" path="*" component={NoMatch} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));