import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Card, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, AppBar, Toolbar, Icon, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

class View extends React.Component {

    componentDidMount() {
        this.props.clear()
        if (/^\/data\/view\/[_a-zA-Z0-9]+@[_a-zA-Z0-9]+$/.test(this.props.location.pathname)) {
            const args = this.props.location.pathname.substring(11).split("@")
            this.props.getDataset(args[0], args[1])
        } else {
            throw new Error('Bad URL')
        }
    }

    mountTable = (dataset) => {
        const titles = [], head = [], body = []
        for (let title in dataset[0]) {
            if (dataset[0].hasOwnProperty(title) && title !== "id") {
                titles.push(title)
                head.push(<TableCell key={title}>{title}</TableCell>)
            }
        }
        for (let i = 0; i < dataset.length; i++) {
            const aux = []
            for (let j = 0; j < titles.length; j++) {
                aux.push(<TableCell key={(i + 1) * dataset.length + j}>{dataset[i][titles[j]]}</TableCell>)
            }
            body.push(<TableRow key={i}>{aux}</TableRow>)
        }
        return (
            <Table>
                <TableHead><TableRow>{head}</TableRow></TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        )
    }

    render() {
        const { metadata, dataset, status } = this.props.data
        console.log(this.props.data)
        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex mb5 mt5">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", top: "4rem", }}>
                        <Toolbar>
                            <Link
                                className="link"
                                to="/data/list/">
                                <Button
                                    variant="outlined">
                                    <Icon>arrow_back</Icon>
                                    Voltar
                            </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <div className="flex justify-center mb5 mt5 w-100">
                        <CircularProgress
                            className="ma5"
                            color="secondary"
                            size={100}
                            style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
                        {status === "DONE" &&
                            <div className="flex w-100">
                                <Card
                                    className="ma3 pa2 w-30"
                                    style={{ overflowY: "auto" }}>
                                    <Typography
                                        className="pb2"
                                        color="primary"
                                        variant="h4">
                                        {metadata.title}
                                    </Typography>
                                    <Typography className="overflow-hidden"><strong>Descrição</strong>: {metadata.description}</Typography>
                                    <Typography className="overflow-hidden"><strong>Origem</strong>: {metadata.source}</Typography>
                                    <Typography className="overflow-hidden"><strong>Colunas</strong>: {metadata.aliasColumns ? metadata.aliasColumns.join(", ") : []}</Typography>
                                    <Typography className="overflow-hidden"><strong>Tags</strong>: {metadata.tags ? metadata.tags.join(", ") : []}</Typography>
                                    <Typography className="overflow-hidden"><strong>Hierarquias</strong>: {metadata.hierarchies ? metadata.hierarchies.join(", ") : []}</Typography>
                                    <Typography className="overflow-hidden"><strong>Email</strong>: {metadata.email}</Typography>
                                </Card>
                                <Card
                                    className="ma3 pa2 w-70"
                                    style={{ overflowX: "scroll" }}>
                                    {dataset && dataset.length && this.mountTable(dataset)}
                                </Card>
                            </div>
                        }
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
        getDataset: (id, table) => { dispatch(Actions.getDataset(id, table, 10)) },
        clear: () => { dispatch({ type: "DATASET_CLEAR" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)