import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Card, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, Icon, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

import * as Calendar from "services/Calendar"

class View extends React.Component {

    componentDidMount() {
        this.props.clear()
        if (/^\/data\/view\/[_a-zA-Z0-9]+$/.test(this.props.location.pathname)) {
            this.props.getDataset(this.props.location.pathname.substring(11))
        } else {
            throw new Error('Bad URL')
        }
    }

    mountTable(metadata) {
        const head = [], body = []

        if (metadata.columns) {
            metadata.columns.forEach((column, index) => {
                head.push(<TableCell key={index}>{column}</TableCell>)
            })
        }

        if (metadata.data) {
            metadata.data.slice(0, 10).forEach((row, index) => {
                const aux = []
                row.forEach((element, index) => {
                    aux.push(<TableCell key={index}>{element}</TableCell>)
                })
                body.push(<TableRow key={index}>{aux}</TableRow>)
            })
        }

        return (
            <Table>
                <TableHead><TableRow>{head}</TableRow></TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        )
    }

    render() {
        const { metadata } = this.props.data

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex mb5 mt5">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", margin: 0, padding: 0, top: "4rem" }}>
                        <Toolbar style={{ height: "4rem", margin: 0, padding: "0 1rem" }}>
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
                        <div className="flex w-100">
                            <Card
                                className="ma3 pa2 w-30"
                                style={{ overflowY: "auto" }}>
                                <Typography
                                    className="pb2"
                                    color="primary"
                                    variant="h5">
                                    {metadata.title}
                                </Typography>
                                <Typography className="overflow-hidden"><strong>Colunas</strong>: {metadata.columns && metadata.columns.join(", ")}</Typography>
                                <Typography className="overflow-hidden"><strong>Usuário</strong>: {metadata.user}</Typography>
                                <Typography className="overflow-hidden"><strong>Data de criação</strong>: {Calendar.TimestampToString(metadata.created_at)}</Typography>
                                <Typography className="overflow-hidden"><strong>Última atualização</strong>: {Calendar.TimestampToString(metadata.updated_at)}</Typography>
                            </Card>
                            <Card
                                className="ma3 pa2 w-70"
                                style={{ overflowX: "scroll" }}>
                                {metadata.data && metadata.data.length && this.mountTable(metadata)}
                            </Card>
                        </div>
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