import { REMOVE_ALERT, SET_ALERT } from "../types";

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter((alert) => {
                return alert.id !== action.payload.id;
            });
        default:
            return state;
    }
};
