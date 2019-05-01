import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { CircularProgress, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, AppBar, Toolbar, InputAdornment, Icon, Button, Divider, Card } from "@material-ui/core"
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
        const { datasets, status } = this.props.data

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex mb5 mt5 w-100">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", top: "4rem", }}>
                        <Toolbar>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <Icon className="mr2">search</Icon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Pesquisar bases de dados"
                                onChange={(event) => this.props.getDatasets(event.target.value)}
                                variant="outlined" />
                        </Toolbar>
                    </AppBar>
                    <div className="flex flex-column items-center mt5 pa3 w-100">
                        <CircularProgress
                            className="ma5"
                            color="secondary"
                            size={100}
                            style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
                        <Card
                            className="pa2 w-100"
                            style={{ background: "#fafafa" }}>
                            <div className="w-100">
                                <Typography
                                    className="pb2"
                                    color="primary"
                                    variant="h5">
                                    Bases de dados
                                </Typography>
                            </div>
                            {datasets.map((dataset, index) =>
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
                                                to={"/data/view/" + dataset.id + "@" + dataset.tableId}>
                                                <Button
                                                    className="button mt5 mb1"
                                                    color="primary"
                                                    variant="outlined">
                                                    Ver dados
                                        </Button>
                                            </Link>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className="flex flex-column"
                                        style={{ background: "#fafafa" }}>
                                        <Typography className="overflow-hidden"><strong>Descrição</strong>: {dataset.description}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Origem</strong>: {dataset.source}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Colunas</strong>: {dataset.aliasColumns.join(", ")}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Tags</strong>: {dataset.tags.join(", ")}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Hierarquias</strong>: {dataset.hierarchies.join(", ")}</Typography>
                                        <Divider style={{ margin: "0.5rem 0" }} />
                                        <Typography className="overflow-hidden"><strong>Email</strong>: {dataset.email}</Typography>
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
        getDatasets: (text) => { dispatch(Actions.getDatasets(text)) },
        clear: () => { dispatch({ type: "DATASET_CLEAR" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)