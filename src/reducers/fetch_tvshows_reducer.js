
import { FETCH_TVSHOWS } from '../actions/actions'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_TVSHOWS:
            return [...state, action.payload];
            break;
    }
    return state;
}