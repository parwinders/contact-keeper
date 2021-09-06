import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from "../types.js";

const ContactState = (props) => {
    const initialState = {
        currentContact: null,
        contacts: [
            {
                id: 1,
                name: "sonam",
                email: "sonam@gmail.com",
                phone: "12345678",
                type: "personal",
            },
            {
                id: 2,
                name: "rio",
                type: "professional",
                email: "rio@gmaul.com",
                phone: "999111222",
            },
        ],
        filtered: null,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //ADD_CONTACT"
    const addContact = (contact) => {
        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact });
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
                contacts: state.contacts,
                currentContact: state.currentContact,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
