import axios from "axios"

const baseUrl = "http://localhost:8000"

export function getDataset(id, length) {
    return function (dispatch) {
        dispatch({ type: "GET_DATASET_LOADING" })
        axios.get(baseUrl + "/base/api/getdata/" + id + "/" + length + "/")
            .then((response) => {
                dispatch({ type: "GET_DATASET", dataset: response.data })
                dispatch({ type: "GET_DATASET_DONE" })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_ERROR", error })
            })
    }
}

export function getDatasets(text) {
    return function (dispatch) {
        dispatch({ type: "GET_DATASET_LOADING" })
        axios.get(baseUrl + "/visualizations/metadata-list/?page=1&text=" + text)
            .then((response) => {
                dispatch({ type: "GET_DATASETS", datasets: response.data.results, })
                dispatch({ type: "GET_DATASET_DONE" })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_ERROR", error })
            })
    }
}