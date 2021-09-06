import { Route, Redirect } from "react-router";
import {  useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuth, loading } = authContext;
    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuth && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
