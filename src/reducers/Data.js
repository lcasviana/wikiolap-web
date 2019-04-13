const data = {
    metadata: {},
    dataset: [],
    datasets: [],
    status: "",
}

export default function reducer(state = data, action) {

    switch (action.type) {

        case "GET_DATASET":
            return {
                ...state,
                dataset: action.dataset,
            }

        case "GET_METADATA":
            return {
                ...state,
                metadata: action.metadata,
            }

        case "GET_DATASETS":
            return {
                ...state,
                datasets: action.datasets,
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

        case "DATASET_CLEAR":
            return data

        default:
            return { ...state }
    }
}