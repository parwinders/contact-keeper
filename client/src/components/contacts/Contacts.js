import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    let { contacts, filtered } = contactContext;

    // Filtering contacts
    if (filtered) contacts = filtered;

    return (
        <Fragment>
            {contacts.length === 0 ? (
                "Please add contact"
            ) : (
                <TransitionGroup>
                    {contacts.map((contact) => (
                        <CSSTransition
                            key={contact.id}
                            timeout={1000}
                            classNames='item'
                        >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </Fragment>
    );
};

export default Contacts;
