const serie = {
    color: "",
    datasetTitle: "",
    tableId: "",
    columnAlias: "",
    columnOriginal: "",
    label: "",
    values: [],
}

const visualization = {
    step: 0,
    graphType: {},
    datasetsList: [],
    datasetsSelected: [],
    datasetsSearch: "",
    selectedSearch: "",
    seriesLabelIndex: -1,
    seriesLabel: serie,
    seriesIndex: [-1,],
    series: [serie,],
    title: "",
    description: "",
}

const page = {
    search: "",
    pages: [],
    page: {},
    datasets: [],
    dataset: [],
    title: "",
    share: { link: "", open: false, },
    visualizations: [visualization,],
}

function pageExpand(page) {
    const p = Object.assign(page, JSON.parse(page.title))
    return {
        ...p,
        title: p.title,
        visualizations: p.visualizations.map(v => ({
            ...visualization,
            ...v,
        }))
    }
}

export default function reducer(state = page, action) {

    switch (action.type) {

        /* ASYNC CASES */

        case "SAVE_PAGE":
            return {
                ...state,
            }

        case "GET_PAGE":
            return {
                ...state,
                page: pageExpand(action.page),
            }

        case "GET_PAGE_LIST":
            return {
                ...state,
                pages: action.pages.map((v, i) => Object.assign({}, v, JSON.parse(v.title))),
            }

        case "DELETE_PAGE":
            return {
                ...state,
                pages: state.pages.filter((v, i) => v.id !== action.id)
            }

        case "GET_DATASET TO DELETE":
            return {
                ...state,
                dataset: action.dataset,
            }

        case "GET_DATASET_LIST":
            return {
                ...state,
                visualizations: action.index !== null ? state.visualizations.map((v, i) => i === action.index ? { ...v, datasetsList: action.datasets, } : v) : state.visualizations,
                datasets: action.index !== null ? state.datasets : action.datasets,
            }

        case "GET_SERIES_LABEL":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, seriesLabel: { ...v, values: action.values.map(v => v[action.column]), }, } : v),
            }

        case "GET_SERIES":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: v.series.map((v, i) => i === action.serie ? { ...v, values: action.values.map(v => v[action.column]), } : { ...v, }), } : v),
            }

        /* SYNC CASES */

        case "PAGE_SEARCH":
            return {
                ...state,
                search: action.text,
            }

        case "PAGE_SHARE":
            return {
                ...state,
                share: { link: action.link, open: true, },
            }

        case "PAGE_SHARE_CLOSE":
            return {
                ...state,
                share: { link: "", open: false, },
            }

        case "PAGE_EDIT":
            return {
                ...action.page,
                visualizations: action.page.visualizations.map((v, i) => { return { ...v, step: 0, datasetsSearch: "", selectedSearch: "", } }),
                update: true,
            }

        case "PAGE_TITLE":
            return {
                ...state,
                title: action.text,
            }

        case "VISUALIZATION_INSERT":
            return {
                ...state,
                visualizations: [...state.visualizations, visualization,],
            }

        case "VISUALIZATION_DELETE":
            return {
                ...state,
                visualizations: state.visualizations.filter((v, i) => i !== action.index),
            }

        case "STEP_NEXT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, step: v.step + 1, } : v)
            }

        case "STEP_PREV":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, step: v.step - 1, } : v)
            }

        case "GRAPH_TYPE_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, graphType: action.graph, } : v),
            }

        case "DATASET_SELECT":
            if (state.visualizations[action.index].datasetsSelected.find(v => action.dataset.id === v.id)) {
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, datasetsSelected: [...v.datasetsSelected, action.dataset,], } : v),
                }
            }

        case "DATASET_REMOVE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, datasetsSelected: v.datasetsSelected.filter((v, i) => i !== action.dataset), } : v),
            }

        case "DATASET_SEARCH":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, datasetsSearch: action.text, } : v),
            }

        case "DATASET_SELECTED_SEARCH":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, selectedSearch: action.text, } : v),
            }

        case "SERIES_LABEL_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, seriesLabel: action.data, seriesLabelIndex: action.value, } : v),
            }

        case "SERIES_LABEL_DEFAULT":
            const length = Math.max.apply(Math, state.visualizations[action.index].series.map(v => v.values.length))
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, seriesLabel: { values: Array.apply(null, { length: Math.min(action.length, length), }).map(Number.call, Number), }, seriesLabelIndex: -1, } : v),
            }

        case "SERIES_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: v.series.map((v, i) => i === action.serie ? action.data : v), seriesIndex: v.seriesIndex.map((v, i) => i === action.serie ? action.value : v), } : v),
            }

        case "SERIES_INSERT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: [...v.series, serie,], seriesIndex: [...v.seriesIndex, -1,], } : v),
            }

        case "SERIES_REMOVE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: v.series.filter((v, i) => i !== action.serie), seriesIndex: v.seriesIndex.filter((v, i) => i !== action.serie), } : v),
            }

        case "SERIES_COLOR":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: v.series.map((v, i) => i === action.serie ? { ...v, color: action.value } : v), } : v),
            }

        case "SERIES_LABEL":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, series: v.series.map((v, i) => i === action.serie ? { ...v, label: action.value } : v), } : v),
            }

        case "TITLE_CHANGE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, title: action.text, } : v),
            }

        case "DESCRIPTION_CHANGE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, description: action.text, } : v),
            }

        default:
            return {
                ...state,
            }
    }
}