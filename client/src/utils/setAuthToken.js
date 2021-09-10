import axios from "axios";

// axios.interceptors.request.use((req) => {
//     console.log(req);
//     console.log(req.headers.common);
//     console.log("-----------");

//     return req;
// });

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};
export default setAuthToken;
