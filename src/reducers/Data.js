const data = {
    metadata: {},
    datasets: [],
    search: "",
    status: "",
}

export default function reducer(state = data, action) {

    switch (action.type) {

        case "LOADING_METADATA":
            return {
                ...state,
                metadata: action.metadata,
            }

        case "GET_METADATA":
            return {
                ...state,
                metadata: Object.assign({}, action.page, JSON.parse(action.page.title)),
            }

        case "GET_DATASETS":
            const allPages = action.pages.map((v, i) => Object.assign({}, v, JSON.parse(v.title)))
            return {
                ...state,
                datasets: allPages.filter(page => page.type === 'dataset'),
            }

        case "GET_DATASET_DONE":
            return {
                ...state,
                status: "DONE",
            }

        case "GET_DATASET_LOADING":
            return {
                ...state,
                status: "LOADING",
            }

        case "GET_DATASET_ERROR":
            return {
                ...state,
                status: "ERROR",
            }

        case "DATASET_SEARCH":
            return {
                ...state,
                search: action.search,
            }

        case "DATASET_CLEAR":
            return data

        default:
            return { ...state }
    }
}