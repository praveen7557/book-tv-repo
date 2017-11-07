
import axios from 'axios';
import { checkCacheValid } from "redux-cache";

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_TVSHOWS = 'FETCH_TVSHOWS';
var proxify = require('proxify-url');
const BOOKS_URL = 'https://www.goodreads.com/review/list/36189301.xml?key=qY1rPUxjLx33WZDq6OkvEQ&v=2&per_page=200';
const page_no = 1;
const list_id = "37823";
const TV_API_KEY = '99c26306be3d1ce05090f2450ff90c6e';
const API_URL = 'https://api.themoviedb.org/4/list/';//37823?page=1&api_key=
const TV_URL = `${API_URL + list_id}?page=${page_no}&api_key=${TV_API_KEY}`;

export function fetchBooks(params) {
    const GET_URL = `${BOOKS_URL}${params == undefined ? "" : "&shelf=" + params}`
    let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    let books = axios.get(proxyUrl, { params: { format: "json" } });
    return (dispatch) => {
        axios.get(proxyUrl, { params: { format: "json" } }).then(books => {
            dispatch({
                type: FETCH_BOOKS,
                payload: books.data
            })
        })
    };
    return {
        type: FETCH_BOOKS,
        payload: books
    };
}

export function fetchTvShows(params) {
    const GET_URL = TV_URL;
    // let proxyUrl = proxify(GET_URL, { inputFormat: 'xml' });
    //let tvShows = axios.get(GET_URL, { params: { format: "json" } });

    return (dispatch) => {
        axios.get(GET_URL, { params: { format: "json" } }).then(tv => {
            console.log(tv);
            var tvJSON = JSON.parse(JSON.stringify(tv.data));
            if (tv.data.total_pages > 1) {
                for (var i = 2; i < tv.data.total_pages + 1; i++) {
                    axios.get(`${API_URL + list_id}?page=${i}&api_key=${TV_API_KEY}`, { params: { format: "json" } }).then(shows => {
                        tvJSON.comments = Object.assign({}, tvJSON.comments, shows.data.comments);
                        tvJSON.results = tvJSON.results.concat(shows.data.results);
                        if (tv.data.total_pages == i - 1) {
                            dispatch({
                                type: FETCH_TVSHOWS,
                                payload: tvJSON
                            })
                        }
                    });
                }
            } else {
                dispatch({
                    type: FETCH_TVSHOWS,
                    payload: tvJSON
                })
            }
        })
    }


    // return {
    //     type: FETCH_TVSHOWS,
    //     payload: tvShows
    // };
}