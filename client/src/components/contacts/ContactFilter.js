import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef("");

    const { filterContacts, clearFilter, filtered } = contactContext;
    const onChange = (e) => {
        if (text.current.value !== "") filterContacts(e.target.value);
        else clearFilter();
    };

    useEffect(() => {
        if (filtered === null){text.current.value = "";}
    },[filtered])

    return (
        <div>
            <input
                ref={text}
                type='text'
                placeholder='Search name or Email'
                onChange={onChange}
            />
        </div>
    );
};

export default ContactFilter;
