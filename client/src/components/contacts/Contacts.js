import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../../utils/Spinner";
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    let { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    // Filtering contacts
    if (filtered) contacts = filtered;

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    {contacts.length === 0 ? (
                        filtered ? (
                            "No Search results found"
                        ) : (
                            "Please add contact"
                        )
                    ) : (
                        <TransitionGroup>
                            {contacts.map((contact) => (
                                <CSSTransition
                                    key={contact._id}
                                    timeout={1000}
                                    classNames='item'
                                >
                                    <ContactItem contact={contact} />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Contacts;
