import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { CircularProgress, Typography, Card, CardActionArea } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.clear()
        this.props.getDatasets("")
    }

    render() {
        const { search, tab } = this.props
        const { datasets, status } = this.props.data

        const data = search === ""
            ? datasets.sort((a, b) => b.created_at - a.created_at).slice(0, 5)
            : datasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)

        return (
            <div className="flex flex-column items-center pa2">
                <div className="w-100">
                    {search === "" && <Typography variant="h5">Últimas 5 bases de dados criadas</Typography>}
                    {search !== "" && tab === 0 && <Typography variant="h5">Bases de dados</Typography>}
                </div>
                <CircularProgress
                    className="ma5"
                    color="secondary"
                    size={50}
                    style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
                <div className="flex flex-row flex-wrap justify-center">
                    {data.map((dataset, index) =>
                        <Card
                            className="ma3 pa2"
                            key={index}
                            style={{ height: "fit-content", width: 420, }}>
                            <CardActionArea>
                                <Link
                                    className="link"
                                    to={"/data/view/" + dataset.tableId}>
                                    <Typography
                                        color="primary"
                                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                        variant="h4">
                                        {dataset.title}
                                    </Typography>
                                    <Typography
                                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                        variant="body2">
                                        <strong>Colunas</strong>: {dataset.aliasColumns.join(", ")}
                                    </Typography>
                                    <Typography
                                        variant="body2">
                                        <strong>Data de criação</strong>: {Calendar.TimestampToString(dataset.created_at)}
                                    </Typography>
                                    <Typography
                                        variant="body2">
                                        <strong>Última modificação</strong>: {Calendar.TimestampToString(dataset.updated_at)}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                        </Card>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.Data,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDatasets: (text) => { dispatch(Actions.getDatasets(text)) },
        clear: () => { dispatch({ type: "DATASET_CLEAR" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)