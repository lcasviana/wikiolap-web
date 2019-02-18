import axios from "axios"

const baseUrl = "http://localhost:8000"

export function savePage(page) {
    return function (dispatch) {
        axios.post(baseUrl + "/visualizations/page-list/", page)
            .then((response) => {
                dispatch({ type: "SAVE_PAGE", response, })
            })
            .catch((error) => {
                dispatch({ type: "SAVE_PAGE_ERR", error, })
            })
    }
}

export function getPageList() {
    return function (dispatch) {
        axios.get(baseUrl + "/visualizations/page-list/")
            .then((response) => {
                dispatch({ type: "GET_PAGE_LIST", list: response.data, })
            })
            .catch((error) => {
                dispatch({ type: "GET_PAGE_LIST_ERR", error, })
            })
    }
}

export function deletePage(id) {
    return function (dispatch) {
        axios.delete(baseUrl + "/visualizations/page-detail/" + id + "/")
            .then((response) => {
                dispatch({ type: "DELETE_PAGE", response, id, })
            })
            .catch((error) => {
                dispatch({ type: "DELETE_PAGE_ERR", error, })
            })
    }
}

export function getDatasets(index, text) {
    return function (dispatch) {
        axios.get(baseUrl + "/visualizations/metadata-list/?page=1&text=" + text)
            .then((response) => {
                dispatch({ type: "GET_DATASET_LIST", index, datasets: response.data.results, })
            })
            .catch((error) => {
                dispatch({ type: "GET_DATASET_LIST_ERR", error, })
            })
    }
}

export function getSeries(index, serie, table, column, length) {
    return function (dispatch) {
        axios.get(baseUrl + "/base/api/getdata/" + table + "/" + column + "/" + length + "/")
            .then((response) => {
                dispatch({ type: "GET_SERIES", index, serie, column, values: response.data, })
            })
            .catch((error) => {
                dispatch({ type: "GET_SERIES_ERR", error, })
            })
    }
}

export function getLabels(index, table, column, length) {
    return function (dispatch) {
        axios.get(baseUrl + "/base/api/getdata/" + table + "/" + column + "/" + length + "/")
            .then((response) => {
                dispatch({ type: "GET_SERIES_LABEL", index, column, values: response.data, })
            })
            .catch((error) => {
                dispatch({ type: "GET_SERIES_LABEL_ERR", error, })
            })
    }
}