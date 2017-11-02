import { combineReducers } from 'redux';
import fetch_books_reducer from './fetch_books_reducer'

const rootReducer = combineReducers({
    books: fetch_books_reducer
});

export default rootReducer;
