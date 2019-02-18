export default function reducer(state = { open: false, }, action) {
    switch (action.type) {

        case "DRAWER_OPEN":
            return { open: true, }

        case "DRAWER_CLOSE":
            return { open: false, }

        default:
            return { open: false, }
    }
}