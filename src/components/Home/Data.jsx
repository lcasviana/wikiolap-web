import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Typography, Card, CardActionArea, Tooltip } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.clear()
        this.props.getDatasets()
    }

    render() {
        const { search } = this.props
        const { datasets } = this.props.data

        const data = datasets
            ? search === ""
                ? datasets.sort((a, b) => {
                    const da = new Date(a.updated_at), db = new Date(b.updated_at)
                    if (da < db) return 1
                    if (da > db) return -1
                    return 0
                }).slice(0, 5)
                : datasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)
            : []

        return (
            <div
                className="flex flex-column items-center pa2"
                style={{ background: "#fafafa" }}>
                <div className="pb2 w-100">
                    {search === "" && <Typography color="primary" variant="h5">Últimas 5 coleções de dados criadas</Typography>}
                    {search !== "" && <Typography color="primary" variant="h5">Coleções de dados pesquisadas</Typography>}
                    {!data.length &&
                        <Typography color="error">
                            Nenhuma base de dados encontrada.
                        </Typography>
                    }
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {data.map((dataset, index) =>
                        <Card
                            className="ma1 pa2"
                            key={index}
                            style={{ height: "fit-content", width: 300 }}>
                            <CardActionArea>
                                <Tooltip
                                    placement="top"
                                    title={
                                        <React.Fragment>
                                            <Typography style={{ color: "white" }}>{dataset.title}</Typography>
                                        </React.Fragment>
                                    }>
                                    <Link
                                        className="link"
                                        to={"/data/view/" + dataset.id}>
                                        <Typography
                                            className="pb2"
                                            color="primary"
                                            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                            variant="h6">
                                            {dataset.title}
                                        </Typography>
                                        <Typography
                                            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                            variant="body2">
                                            <strong>Colunas</strong>: {dataset.columns.join(", ")}
                                        </Typography>
                                        <Typography
                                            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                            variant="body2">
                                            <strong>Usuário</strong>: {dataset.user}
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
                                </Tooltip>
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
        getDatasets: () => { dispatch(Actions.getDatasets()) },
        clear: () => { dispatch({ type: "DATASET_CLEAR" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)