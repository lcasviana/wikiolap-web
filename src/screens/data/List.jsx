import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { CircularProgress, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, AppBar, Toolbar, InputAdornment, Icon, Button, Divider } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.clear()
        this.props.getDatasets("")
    }

    render() {
        const { datasets, status } = this.props.data

        return (
            <div className="flex mb5 mt5">
                <CircularProgress
                    className="ma5"
                    color="secondary"
                    size={100}
                    style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
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
                            placeholder="Pesquisar datasets"
                            onChange={(event) => this.props.getDatasets(event.target.value)}
                            variant="outlined" />
                    </Toolbar>
                </AppBar>
                <div className="mt5 pa3 w-100">
                    {datasets.map((dataset, index) =>
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary style={{ paddingRight: 0, }}>
                                <div className="flex justify-between w-100 items-center">
                                    <Typography>
                                        {dataset.title}
                                    </Typography>
                                    <Link
                                        className="link"
                                        to={"/data/view/" + dataset.tableId}>
                                        <Button
                                            className="button mt5 mb1"
                                            color="primary"
                                            variant="outlined">
                                            Ver dados
                                        </Button>
                                    </Link>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="flex flex-column">
                                <Typography className="overflow-hidden">Descrição: {dataset.description}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Origem: {dataset.source}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Colunas: {dataset.originalColumns.toString()}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Tags: {dataset.tags.toString()}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Hierarquias: {dataset.hierarchies.toString()}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Email: {dataset.email}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Data de criação: {Calendar.TimestampToString(dataset.created_at)}</Typography>
                                <Divider style={{ margin: "0.5rem 0" }} />
                                <Typography className="overflow-hidden">Última atualização: {Calendar.TimestampToString(dataset.updated_at)}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>)
                    }
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