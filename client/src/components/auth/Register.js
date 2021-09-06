import { useState, useContext, useEffect } from "react";
import React from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuth } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuth) {
            props.history.push("/", { vin: "awesome" });
        }
        if (error) setAlert("danger", error);
        clearErrors();
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const [user, setUSer] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        setUSer({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            password2 === ""
        ) {
            setAlert("danger", " please complete the details", 2000);
        } else if (password2 !== password) {
            setAlert("danger", "Passwords do not match", 2000);
        } else {
            console.log("Registering User");
            register(user);
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'> Register</span>{" "}
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type='submit'
                    value='register'
                    className='btn btn-primary btn-block'
                />
            </form>
        </div>
    );
};

export default Register;
