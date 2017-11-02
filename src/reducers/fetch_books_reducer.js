import { FETCH_BOOKS } from '../actions/actions'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BOOKS:
            console.log(action.payload.data.query.results.GoodreadsResponse.reviews.review);
            return action.payload.data.query.results.GoodreadsResponse.reviews.review;
            break;
    }
    return state;
}