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
            graphType: v.graphType,
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