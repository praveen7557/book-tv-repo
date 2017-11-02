import axios from 'axios';
import { checkCacheValid } from "redux-cache";

export const FETCH_BOOKS = 'FETCH_BOOKS';
var proxify = require('proxify-url');
const BOOKS_URL = 'https://www.goodreads.com/review/list/36189301.xml?key=qY1rPUxjLx33WZDq6OkvEQ&v=2&per_page=200';

export function fetchBooks(params, getState) {
    // const isCacheValid = checkCacheValid(getState, "books");
    // if (isCacheValid) { return null; }

    const GET_URL = `${BOOKS_URL}${params == undefined ? "" : "&shelf=" + params}`
    let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    let books = axios.get(proxyUrl, { params: { format: "json" } });
    console.log('====================================');
    console.log(books);
    console.log('====================================');
    return {
        type: FETCH_BOOKS,
        payload: books
    };
}