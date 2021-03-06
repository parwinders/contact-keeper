import React, { useContext, Fragment } from "react";
import Pt from "prop-types";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuth, logout, user } = authContext;
    const onLogout = () => {
        logout();
        contactContext.clearContacts();
    };
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i>
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>{isAuth ? authLinks : guestLinks}</ul>
        </div>
    );
};
Navbar.Pt = {
    title: Pt.string.isRequired,
    icon: Pt.string,
};
Navbar.defaultProps = {
    title: "Contact-Keeper",
    icon: "fas fa-id-card-alt",
};
export default Navbar;
