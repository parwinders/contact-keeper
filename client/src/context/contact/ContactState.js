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
    CLEAR_CONTACTS,
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

    // UPDATE_CONTACT
    const updateContact = async (contact) => {
        const config = {
            Headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.put(
                `/api/contacts/${contact["_id"]}`,
                contact,
                config
            );
            dispatch({ type: UPDATE_CONTACT, payload: res.data["_id"] });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    // DELETE_CONTACT
    const deleteContact = async (_id) => {
        console.log("deleting _id", _id);
        try {
            await axios.delete(`/api/contacts/${_id}`);
            dispatch({ type: DELETE_CONTACT, payload: _id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    // SET_CURRENT"
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
        console.log("SET_CURRENT", contact);
    };
    //"CLEAR_CURRENT";
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // "FILTER_CONTACT";
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    //CLEAR_FILTER";

    const clearFilter = (text) => {
        dispatch({ type: CLEAR_FILTER });
    };

    // CLEAR_CONTACTS
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
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
                clearContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
