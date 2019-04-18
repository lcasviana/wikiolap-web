import axios from "axios"

const baseUrl = "http://localhost:8000"

export function signUp(user) {
    return function (dispatch) {
        axios.post(baseUrl + "/authentication/register", user)
            .then((response) => {
                dispatch({ type: "USER_REGISTER", response, user, })
            })
            .catch((error) => {
                dispatch({ type: "USER_REGISTER_ERROR", error, })
            })
    }
}

export function signIn(user, from) {
    return function (dispatch) {
        axios.post(baseUrl + "/authentication/user-login/", user)
            .then((response) => {
                dispatch({ type: "USER_LOGIN", response, user, })
            })
            .catch((error) => {
                dispatch({ type: "USER_LOGIN_ERROR", error, from, })
            })
    }
}