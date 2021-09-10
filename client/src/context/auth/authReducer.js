import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types.js";

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading: false,
                isAuth: true,
            };
        case REGISTER_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
                token: null,
                loading: false,
                user: null,
                error: action.payload || null,
            };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false,
            };

        default:
            return state;
    }
};
