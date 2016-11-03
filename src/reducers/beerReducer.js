import * as types from '../actions/actionTypes';

export default function beerReducer(state = [], action) {
    switch(action.type) {
        case types.CREATE_BEER:
            return [...state, Object.assign({}, action.beer)];
        default:
            return state;
    }
}