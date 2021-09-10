import React, { useReducer } from "react";
import axios from "axios";
//import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
} from "../types.js";

const ContactState = (props) => {
    const initialState = {
        currentContact: null,
        contacts: [],
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // GET_CONTACTS
    const getContacts = async () => {
        try {
            const res = await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    //ADD_CONTACT"
    const addContact = async (contact) => {
        const config = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    //"DELETE_CONTACT";
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    //SET_CURRENT";
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
        console.log("SET_CURRENT", contact);
    };
    //"CLEAR_CURRENT";
    const clearCurrent = (contact) => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // "UPDATE_CONTACT";
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    // "FILTER_CONTACT";
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    //CLEAR_FILTER";

    const clearFilter = (text) => {
        dispatch({ type: CLEAR_FILTER });
    };
    //SET_ALERT";

    //REMOVE_ALERT";

    return (
        <ContactContext.Provider
            value={{
                error: state.error,
                contacts: state.contacts,
                currentContact: state.currentContact,
                filtered: state.filtered,
                loading: state.loading,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContacts,
                getContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
