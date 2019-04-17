const user = {
    username: "",
    email: "",
    password_1: "",
    password_2: "",
    isAuthenticated: localStorage.getItem("email") && localStorage.getItem("password"),
    menu: null,
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
                username: action.response.data.username,
                email: action.response.data.email,
                password_1: action.user.password,
                password_2: "",
                isAuthenticated: true,
                menu: false,
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

        case "USER_CLEAR":
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            return user

        case "USER_MENU_OPEN":
            return {
                ...state,
                menu: action.target,
            }

        case "USER_MENU_CLOSE":
            return {
                ...state,
                menu: null,
            }

        default:
            return {
                ...state
            }
    }
}