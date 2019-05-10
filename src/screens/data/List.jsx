import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Divider, Card } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.clear()
        this.props.getDatasets("")
    }

    render() {
        const { datasets, search, status } = this.props.data

        const filtered = datasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)

        return (
            <div>
                <Nav
                    show={true}
                    onChangeFunction={this.props.datasetSearch}
                    searchLabel={"Pesquisar coleções de dados..."} />
                <Draw />
                <div className="flex mt5 w-100">
                    <div className="flex flex-column items-center pa3 w-100">
                        <Card
                            className="pa2 w-100"
                            style={{ background: "#fafafa" }}>
                            <div className="w-100">
                                <Typography
                                    className="pb2"
                                    color="primary"
                                    variant="h5">
                                    Coleções de dados
                                </Typography>
                                {!filtered.length &&
                                    <Typography color="error">
                                        Nenhuma coleção de dados encontrada.
                                    </Typography>
                                }
                            </div>
                            {status === "DONE" && filtered.map((dataset, index) =>
                                <ExpansionPanel
                                    className="w-100"
                                    key={index}
                                    style={{ margin: 0 }}>
                                    <ExpansionPanelSummary style={{ paddingRight: 0, }}>
                                        <div className="flex justify-between w-100 items-center">
                                            <Typography
                                                color="primary"
                                                style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                                                {dataset.title}
                                            </Typography>
                                            <Link
                                                className="link"
                                                to={"/data/view/" + dataset.id}>
                                                <Button
                                                    className="button mt5 mb1"
                                                    color="primary"
                                                    variant="raised">
                                                    Ver dados
                                                </Button>
                                            </Link>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className="flex flex-column"
                                        style={{ background: "#fafafa" }}>
                                        <Typography className="overflow-hidden"><strong>Colunas</strong>: {dataset.columns.join(", ")}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Usuário</strong>: {dataset.user}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Data de criação</strong>: {Calendar.TimestampToString(dataset.created_at)}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Última atualização</strong>: {Calendar.TimestampToString(dataset.updated_at)}</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )}
                        </Card>
                    </div>
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
        clear: () => dispatch({ type: "DATASET_CLEAR" }),
        getDatasets: () => dispatch(Actions.getDatasets()),
        datasetSearch: (search) => dispatch({ type: "DATASET_SEARCH", search }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)