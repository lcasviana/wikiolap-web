const serie = {
    color: "",
    label: "",
    values: [],
}

const visualization = {
    step: 0,
    graphType: "",
    datasets: [],
    search: ["", ""],
    labelIndex: -1,
    label: serie,
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
    deleteDialog: false,
    status: "",
    share: { link: "", open: false },
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
        })),
        username: p.username,
    }
}

export default function reducer(state = page, action) {

    switch (action.type) {

        /* ASYNC CASES */

        case "SAVE_PAGE":
            return {
                ...state
            }

        case "GET_PAGE":
            return {
                ...state,
                page: pageExpand(action.page)
            }

        case "GET_PAGE_LIST":
            const allPages = action.pages.map((v, i) => Object.assign({}, v, JSON.parse(v.title)))
            return {
                ...state,
                pages: allPages.filter(page => page.type === 'page')
            }

        case "DELETE_PAGE":
            return {
                ...state,
                pages: state.pages.filter((v, i) => v.id !== action.id)
            }

        /* SYNC CASES */

        case "GET_PAGE_DONE":
            return {
                ...state,
                status: "DONE"
            }

        case "GET_PAGE_LOADING":
            return {
                ...state,
                status: "LOADING"
            }

        case "GET_PAGE_ERROR":
            return {
                ...state,
                status: "ERROR"
            }

        case "PAGE_CLEAR":
            return page

        case "PAGE_SEARCH":
            return {
                ...state,
                search: action.text
            }

        case "PAGE_SHARE":
            return {
                ...state,
                share: {
                    link: action.link,
                    open: true,
                }
            }

        case "PAGE_SHARE_CLOSE":
            return {
                ...state,
                share: {
                    link: "",
                    open: false
                }
            }

        case "PAGE_EDIT":
            return {
                ...action.page,
                visualizations: action.page.visualizations.map(v => ({
                    ...v,
                    step: 0,
                    datasetsSearch: "",
                    selectedSearch: "",
                })),
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
                visualizations: [
                    ...state.visualizations,
                    visualization
                ]
            }

        case "VISUALIZATION_DELETE":
            return {
                ...state,
                visualizations: state.visualizations.filter((v, i) => i !== action.index)
            }

        case "STEP_NEXT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            step: v.step + 1
                        }
                        : v
                )
            }

        case "STEP_PREV":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            step: v.step - 1
                        }
                        : v
                )
            }

        case "GRAPH_TYPE_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            graphType: action.graph
                        }
                        : v
                )
            }

        case "DATASET_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            datasets: [...v.datasets, action.dataset],
                            labelIndex: -1,
                            label: serie,
                            seriesIndex: [-1],
                            series: [serie,]
                        }
                        : v
                )
            }

        case "DATASET_REMOVE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            datasets: v.datasets.filter((v, i) => i !== action.dataset),
                            labelIndex: -1,
                            label: serie,
                            seriesIndex: [-1],
                            series: [serie]
                        }
                        : v
                )
            }

        case "DATASET_SEARCH":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            search: [...action.text]
                        }
                        : v
                )
            }

        case "SERIES_LABEL_SELECT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            label: { ...action.data },
                            labelIndex: action.value
                        }
                        : v
                )
            }

        case "SERIES_LABEL_DEFAULT":
            const length = Math.max.apply(Math, state.visualizations[action.index].series.map(v => v.values.length))
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) => i === action.index ? { ...v, label: { values: Array.apply(null, { length }).map(Number.call, Number) }, labelIndex: -1 } : v),
            }

        case "SERIES_SELECT":
            const dynamicColors = () => {
                const r = Math.floor(Math.random() * 255)
                const g = Math.floor(Math.random() * 255)
                const b = Math.floor(Math.random() * 255)
                return "rgb(" + r + "," + g + "," + b + ",0.5)"
            }

            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            series: v.series.map((s, i) =>
                                i === action.serie
                                    ? {
                                        ...s,
                                        ...action.data,
                                        color: v.graphType === "pie"
                                            ? action.data.values.map(v => dynamicColors())
                                            : s.color
                                    }
                                    : s
                            ),
                            seriesIndex: v.seriesIndex.map((v, i) =>
                                i === action.serie
                                    ? action.value
                                    : v
                            )
                        } :
                        v
                )
            }

        case "SERIES_INSERT":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            series: [
                                ...v.series,
                                serie
                            ],
                            seriesIndex: [
                                ...v.seriesIndex,
                                -1
                            ]
                        }
                        : v
                )
            }

        case "SERIES_REMOVE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            series: v.series.filter((v, i) => i !== action.serie),
                            seriesIndex: v.seriesIndex.filter((v, i) => i !== action.serie)
                        }
                        : v
                )
            }

        case "SERIES_COLOR":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            series: v.series.map((v, i) =>
                                i === action.serie
                                    ? {
                                        ...v,
                                        color: action.value
                                    }
                                    : v
                            )
                        }
                        : v
                )
            }

        case "SERIES_LABEL":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            series: v.series.map((v, i) =>
                                i === action.serie
                                    ? {
                                        ...v,
                                        label: action.value
                                    }
                                    : v)
                        }
                        : v
                )
            }

        case "TITLE_CHANGE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            title: action.text
                        }
                        : v
                )
            }

        case "DESCRIPTION_CHANGE":
            return {
                ...state,
                visualizations: state.visualizations.map((v, i) =>
                    i === action.index
                        ? {
                            ...v,
                            description: action.text
                        }
                        : v
                )
            }

        case "DELETE_DIALOG_OPEN":
            return {
                ...state,
                deleteDialog: true
            }

        case "DELETE_DIALOG_CLOSE":
            return {
                ...state,
                deleteDialog: false
            }

        default:
            return {
                ...state
            }
    }
}