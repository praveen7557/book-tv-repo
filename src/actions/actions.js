import axios from 'axios';
export const FETCH_BOOKS = 'FETCH_BOOKS';
var proxify = require('proxify-url');
const BOOKS_URL = 'https://www.goodreads.com/review/list/36189301.xml?key=qY1rPUxjLx33WZDq6OkvEQ&v=2&per_page=200';

export function fetchBooks(params) {
    let proxyUrl = proxify(BOOKS_URL, { inputFormat: 'xml' });
    let books = axios.get(proxyUrl, { params: { format: "json" } });
    console.log('====================================');
    console.log(books);
    console.log('====================================');
    return {
        type: FETCH_BOOKS,
        payload: books
    };
}