import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, AppBar, Toolbar, InputAdornment, Icon, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.getDatasets("")
    }

    render() {
        return (
            <div className="flex mb5 mt5">
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
                    {this.props.datasets.map((dataset, index) =>
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary>
                                <Typography>
                                    {dataset.title}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="flex flex-column">
                                <Typography className="overflow-hidden">Descrição: {dataset.description}</Typography>
                                <Typography className="overflow-hidden">Origem: {dataset.source}</Typography>
                                <Typography className="overflow-hidden">Colunas: {dataset.originalColumns.toString()}</Typography>
                                <Typography className="overflow-hidden">Tags: {dataset.tags.toString()}</Typography>
                                <Typography className="overflow-hidden">Hierarquias: {dataset.hierarchies.toString()}</Typography>
                                <Typography className="overflow-hidden">Email: {dataset.email}</Typography>
                                <Typography className="overflow-hidden">Data de criação: {Calendar.TimestampToString(dataset.created_at)}</Typography>
                                <Typography className="overflow-hidden">Última atualização: {Calendar.TimestampToString(dataset.updated_at)}</Typography>
                                <Link
                                    className="link"
                                    to={"/data/view/" + dataset.tableId}>
                                    <Button color="primary"><Icon>table_chart</Icon></Button>
                                </Link>
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
        datasets: state.Page.datasets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDatasets: (text) => { dispatch(Actions.getDatasets(null, text)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)