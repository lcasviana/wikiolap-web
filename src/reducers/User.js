const user = {
    username: "",
    email: "",
    password_1: "",
    password_2: "",
    isAuthenticated: localStorage.getItem("email") && localStorage.getItem("password"),
}

export default function reducer(state = user, action) {
    switch (action.type) {

        case "USER_REGISTER":
            return {
                ...state,
            }

        case "USER_LOGIN":
            localStorage.setItem("email", action.user.email)
            localStorage.setItem("password", action.user.password)
            return {
                ...state,
                isAuthenticated: true,
            }

        case "USER_LOGOUT":
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            return {
                ...state,
                isAuthenticated: false,
            }

        case "USER_NAME":
            return {
                ...state,
                username: action.text,
            }

        case "USER_EMAIL":
            return {
                ...state,
                email: action.text,
            }

        case "USER_PASSWORD_1":
            return {
                ...state,
                password_1: action.text,
            }

        case "USER_PASSWORD_2":
            return {
                ...state,
                password_2: action.text,
            }

        default:
            return {
                ...state
            }
    }
}