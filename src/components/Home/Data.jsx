import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { CircularProgress, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Divider } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentWillMount() {
        this.props.clear()
        this.props.getDatasets("")
    }

    render() {
        const { search } = this.props
        const { datasets, status } = this.props.data

        const data = search === ""
            ? datasets.sort((a, b) => b.created_at - a.created_at).slice(0, 5)
            : datasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)

        return (
            <div>
                {search === "" && <h3>Últimos 5</h3>}
                {data.map((dataset, index) =>
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
                    </ExpansionPanel>)
                }
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