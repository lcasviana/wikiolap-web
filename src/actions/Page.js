import axios from "axios"

const baseUrl = "http://localhost:8000"

function pageShrink(page) {
    return {
        title: page.title,
        visualizations: page.visualizations.map(v => ({
            datasetsList: [],
            datasetsSelected: v.datasetsSelected.map(d => ({
                aliasColumns: d.aliasColumns,
                description: d.description,
                id: d.id,
                originalColumns: d.originalColumns,
                title: d.title,
            })),
            description: v.description,
            graphType: { type: v.graphType.type, },
            series: v.series.map(s => ({
                color: s.color,
                columnAlias: s.columnAlias,
                columnOriginal: s.columnOriginal,
                datasetTitle: s.datasetTitle,
                label: s.label,
                tableId: s.tableId,
                values: s.values,
            })),
            seriesIndex: v.seriesIndex,
            seriesLabel: { values: v.seriesLabel.values, },
            seriesLabelIndex: v.seriesLabelIndex,
            title: v.title,
        })),
        username: page.username,
    }
}

export function savePage(page) {
    return function (dispatch) {
        axios.post(baseUrl + "/visualizations/page-list/", { title: JSON.stringify(pageShrink(page)), visualizations: [] })
            .then((response) => {
                dispatch({ type: "SAVE_PAGE", response, })
            })
            .catch((error) => {
                dispatch({ type: "SAVE_PAGE_ERR", error, })
            })
    }
}

export function updatePage(page) {
    return function (dispatch) {
        axios.put(baseUrl + "/visualizations/page-detail/" + page.id + "/", { title: JSON.stringify(pageShrink(page)), visualizations: [] })
            .then((response) => {
                dispatch({ type: "UPDATE_PAGE", response, })
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_PAGE_ERR", error, })
            })
    }
}

export function getPage(id) {
    return function (dispatch) {
        dispatch({ type: "GET_PAGE_LOADING" })
        axios.get(baseUrl + "/visualizations/page-detail/" + id + "/")
            .then((response) => {
                dispatch({ type: "GET_PAGE", page: response.data, })
                dispatch({ type: "GET_PAGE_DONE" })
            })
            .catch((error) => {
                dispatch({ type: "GET_PAGE_ERROR", error })
            })
    }
}

export function getPageList() {
    return function (dispatch) {
        dispatch({ type: "GET_PAGE_LOADING" })
        axios.get(baseUrl + "/visualizations/page-list/")
            .then((response) => {
                dispatch({ type: "GET_PAGE_LIST", pages: response.data, })
                dispatch({ type: "GET_PAGE_DONE" })
            })
            .catch((error) => {
                dispatch({ type: "GET_PAGE_ERROR", error })
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
        axios.get(baseUrl + "/base/api/getdata/" + table + "/" + column.toLowerCase() + "/" + length + "/")
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
        axios.get(baseUrl + "/base/api/getdata/" + table + "/" + column.toLowerCase() + "/" + length + "/")
            .then((response) => {
                dispatch({ type: "GET_SERIES_LABEL", index, column, values: response.data, })
            })
            .catch((error) => {
                dispatch({ type: "GET_SERIES_LABEL_ERR", error, })
            })
    }
}