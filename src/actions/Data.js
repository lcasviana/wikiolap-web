import axios from "axios"

const baseUrl = "http://localhost:8000"

export function getDataset(id) {
    return function (dispatch) {
        dispatch({ type: "GET_DATASET_LOADING" })
        axios.get(baseUrl + "/visualizations/page-detail/" + id + "/")
            .then((response) => {
                dispatch({ type: "GET_METADATA", page: response.data })
                dispatch({ type: "GET_DATASET_DONE" })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_ERROR", error })
            })
    }
}

export function getDatasets() {
    return function (dispatch) {
        dispatch({ type: "GET_DATASET_LOADING" })
        axios.get(baseUrl + "/visualizations/page-list/")
            .then((response) => {
                dispatch({ type: "GET_DATASETS", pages: response.data, })
                dispatch({ type: "GET_DATASET_DONE", response })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_ERROR", error })
            })
    }
}

export function uploadDataset(metadata) {
    return function (dispatch) {
        dispatch({ type: "GET_DATASET_LOADING" })
        axios.post(baseUrl + "/visualizations/page-list/", { title: JSON.stringify(metadata), visualizations: [] })
            .then((response) => {
                dispatch({ type: "GET_DATASET_DONE", response })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_ERROR", error })
            })
    }
}