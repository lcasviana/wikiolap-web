import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Button, Card, Table, TableBody, TableHead, TableCell, TableRow, Icon, Typography, AppBar, Toolbar, TextField } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

class New extends React.Component {

    componentDidMount() {
        this.props.clear()
    }

    uploadFile(event) {
        const file = event.target.files[0]

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8")
            reader.onload = (event) => {
                const content = event.target.result.split("\n").map(row => row.replace("\r", "").split(",")).slice(0, -1)
                const { metadata } = this.props.data
                this.props.loadingDataset({
                    ...metadata,
                    columns: content[0],
                    data: content.splice(1, content.length - 1),
                    type: 'dataset'
                })
            }
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
        const { username } = this.props.user

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex flex-column items-center mt5 pa3 w-100">
                    <AppBar
                        color="default"
                        style={{ bottom: "0", height: "4rem", top: "auto" }}>
                        <Toolbar
                            className="flex justify-between"
                            style={{ height: "4rem" }}>
                            <div>
                                <input
                                    accept="*"
                                    id="raised-button-file"
                                    onChange={(event) => this.uploadFile(event)}
                                    style={{ display: 'none' }}
                                    type="file" />
                                <label htmlFor="raised-button-file">
                                    <Button
                                        color="primary"
                                        component="span"
                                        size="large"
                                        style={{ marginRight: ".5rem", width: 300 }}
                                        variant="contained">
                                        <Icon className="mr2">cloud_upload</Icon>
                                        Carregar dados
                                    </Button>
                                </label>
                            </div>
                            <TextField
                                className="flex"
                                label="Título da coleção de dados"
                                onChange={(event) => this.props.loadingDataset({ ...metadata, title: event.target.value })}
                                style={{ flexGrow: 1, background: "#e0f2f1", maxWidth: 500, borderRadius: "5px 5px 0 0" }}
                                variant="filled" />
                            <Link
                                className="link pl2"
                                onClick={(event) => { if (!metadata.title || !metadata.data || !metadata.data.length) { event.preventDefault() } }}
                                to="/">
                                <Button
                                    disabled={!metadata.title || !metadata.data || !metadata.data.length}
                                    color="primary"
                                    onClick={() => {
                                        this.props.uploadDataset({ ...metadata, user: username })
                                        this.props.refreshPage(true)
                                    }}
                                    size="large"
                                    style={{ width: 300 }}
                                    variant="contained">
                                    <Icon className="mr2">done</Icon>
                                    Finalizar carregamento
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <Card className="pa2 mb5 w-100">
                        <div className="flex flex-column">
                            {(!metadata.data || !metadata.data.length) &&
                                <Typography
                                    className="tc w-100"
                                    color="primary"
                                    variant="h5">
                                    ● Selecione uma coleção de dados no botão 'Carregar dados' na barra inferior
                                </Typography>
                            }
                            {!metadata.title &&
                                <Typography
                                    className="tc w-100"
                                    color="primary"
                                    variant="h5">
                                    ● Dê um nome para a coleção carregada no campo 'Título da coleção de dados' na barra inferior
                                </Typography>
                            }
                            {(metadata.data && metadata.data.length) && metadata.title &&
                                <Typography
                                    className="tc w-100"
                                    color="primary"
                                    variant="h5">
                                    Tudo pronto! Clique no botão 'Finalizar carregamento' na barra inferior :)
                                </Typography>
                            }
                        </div>
                        {metadata.data && metadata.data.length &&
                            <Card
                                className="mt3"
                                square>
                                {this.mountTable(metadata)}
                            </Card>
                        }
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.Data,
        user: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => dispatch({ type: "DATASET_CLEAR" }),
        loadingDataset: (metadata) => dispatch({ type: "LOADING_METADATA", metadata }),
        uploadDataset: (metadata) => dispatch(Actions.uploadDataset(metadata)),
        refreshPage: (refresh) => dispatch({ type: "HOME_REFRESH", refresh })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)