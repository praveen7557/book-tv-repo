import { combineReducers } from 'redux';
import fetch_books_reducer from './fetch_books_reducer';
import fetch_tvshows_reducer from './fetch_tvshows_reducer';
import fetch_is_books from './fetch_is_books';

const rootReducer = combineReducers({
    books: fetch_books_reducer,
    shows: fetch_tvshows_reducer,
    isBooks: fetch_is_books
});

export default rootReducer;
