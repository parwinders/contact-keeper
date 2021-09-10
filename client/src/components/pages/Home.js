import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import Spinner from "../../utils/Spinner";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);
    const { isAuth } = authContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return !isAuth ? (
        <Spinner />
    ) : (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
