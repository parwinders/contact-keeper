import { useState, useContext, useEffect } from "react";
import React from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuth, loadUser } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        (async () => {
            await loadUser();
            if (isAuth) {
                console.log("already Authenticated redirect to /");
                props.history.push({ pathname: "/", state: "parwinder" });
            }
            if (error) {
                setAlert("danger", error);
                clearErrors();
            }
        })();
        //eslint-disable-next-line
    }, [isAuth, error]);

    const [user, setUSer] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUSer({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className='form-container'>
            <h1>
                Login <span className='text-primary'> User</span>{" "}
            </h1>
            <form onSubmit={onSubmit}>
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

export default Login;
