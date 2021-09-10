import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { name, type, email, phone, _id } = contact;
    console.log(contact);

    const onDelete = () => {
        contactContext.deleteContact(_id);
        contactContext.clearCurrent();
    };
    const onEdit = () => {
        console.log("edit", contact);
        contactContext.setCurrent(contact);
    };
    return (
        <Fragment>
            <div className='card bg-light'>
                <h3 className='text-primary text-left'>
                    {name}{" "}
                    <span
                        style={{ float: "right" }}
                        className={
                            "badge " +
                            (type === "professional"
                                ? "badge-success"
                                : "badge-primary")
                        }
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                </h3>
                <ul className='list'>
                    {email && (
                        <li>
                            <i className='fas fa-envelope-open'></i> {email}
                        </li>
                    )}
                    {phone && (
                        <li>
                            <i className='fas fa-phone'></i> {phone}
                        </li>
                    )}
                </ul>
                <p>
                    <button className='btn btn-dark btn-sm' onClick={onEdit}>
                        Edit
                    </button>
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </p>
            </div>
        </Fragment>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
