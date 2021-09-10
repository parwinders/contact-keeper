import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = (props) => {
    const initialState = {
        user: null,
        token: localStorage.getItem("token"),
        isAuth: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User
    const loadUser = async () => {
        console.log("loadUser");

        setAuthToken(localStorage.token);

        try {
            let res = await axios.get("/api/auth");
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };
    //Register User
    const register = async (formData) => {
        const config = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/users", formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAILURE,
                payload: error.response.data.msg,
            });
        }
    };

    //Login
    const login = async (formData) => {
        console.log("login");
        const config = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/auth", formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg,
            });
        }
    };

    //Logout
    const logout = () => {
        console.log("logout");
        dispatch({ type: LOGOUT });
    };

    //Clear Errors
    const clearErrors = () => {
        console.log("clearErrors");
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                error: state.error,
                loading: state.loading,
                user: state.user,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
