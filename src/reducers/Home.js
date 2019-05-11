const home = {
    search: "",
    tab: 0
}

export default function reducer(state = home, action) {

    switch (action.type) {

        case "HOME_SEARCH":
            return {
                ...state,
                search: action.text,
                tab: action.text === "" ? 0 : state.tab
            }

        case "HOME_TAB":
            return {
                ...state,
                tab: action.tab
            }

        default:
            return {
                ...state
            }
    }
}