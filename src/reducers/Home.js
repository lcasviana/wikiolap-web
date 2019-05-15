const home = {
    refresh: false,
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

        case "HOME_REFRESH":
            return {
                ...state,
                refresh: action.refresh
            }

        default:
            return {
                ...state
            }
    }
}