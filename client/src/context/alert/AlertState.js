import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../types.js";

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (
        type = "danger",
        msg = "Something is wrong ",
        timeout = 1000
    ) => {
        let id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { type, msg, timeout, id },
        });
        console.log("setting alert", type, msg, "for", timeout, "ms");
        setTimeout(() => {
            console.log("Clearing alert with id", id);
            dispatch({ type: REMOVE_ALERT, payload: { id } });
        }, timeout);
    };

    return (
        <AlertContext.Provider
            value={{
                setAlert,
                alerts: state,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
