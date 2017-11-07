import { FETCH_BOOKS } from '../actions/actions'
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

// const initialState = {
//     [DEFAULT_KEY]: null
//     // ...other keys 
// }

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BOOKS:
            return action.payload.query.results.GoodreadsResponse.reviews.review;
            break;
    }
    return state;
}