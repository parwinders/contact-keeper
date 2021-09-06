import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => (
    <AuthState>
        <ContactState>
            <AlertState>
                <Router>
                    <Navbar />
                    <div className='container'>
                        <Alerts />
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            '
                            <PrivateRoute exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />
                        </Switch>
                    </div>
                </Router>
            </AlertState>
        </ContactState>
    </AuthState>
);
export default App;
