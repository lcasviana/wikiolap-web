import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Tooltip, Typography, Grid, TextField, IconButton, Icon, Card, Table, TableBody, TableRow, TableCell, TableHead, Divider } from "@material-ui/core"

class Data extends React.Component {

    componentWillMount() {
        this.props.getDatasets()
    }

    render() {
        const mainIndex = this.props.index
        const { datasets, search } = this.props.page.visualizations[mainIndex]
        const allDatasets = this.props.data.datasets

        const filteredAllDatasets = allDatasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search[0].toLowerCase().trim()) !== -1)
            .filter(dataset => !datasets.find(d => d.id === dataset.id))
        const filteredDatasets = datasets.filter(dataset => dataset.title.toLowerCase().trim().indexOf(search[1].toLowerCase().trim()) !== -1)

        return (
            <Grid
                className="h-100"
                container>
                <Grid
                    className="h-100 pa2"
                    item
                    xs={6}>
                    <Card
                        className="h-100"
                        style={{ overflowY: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ background: "white", position: "sticky", top: 0, zIndex: 100 }}>
                                        <Typography
                                            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                                            variant="h5">
                                            Coleções de dados cadastradas
                                        </Typography>
                                        <TextField
                                            className="w-100"
                                            label="Pesquisar coleções de dados..."
                                            margin="normal"
                                            onChange={(event) => this.props.filterDatasets(mainIndex, [event.target.value, search[1]])}
                                            style={{ marginTop: 0 }}
                                            value={search[0]} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAllDatasets.length > 0 && filteredAllDatasets.map((dataset, index) =>
                                    <TableRow key={index}>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography style={{ display: "inline-block" }}>{dataset.title}</Typography>
                                            <div>
                                                <Tooltip
                                                    placement="left"
                                                    title={
                                                        <React.Fragment>
                                                            <Typography style={{ color: "white" }}>{dataset.title}</Typography>
                                                            <Divider style={{ background: "white" }} />
                                                            <Typography style={{ color: "white" }}><em>{dataset.columns.join(", ")}</em></Typography>
                                                        </React.Fragment>
                                                    }>
                                                    <div className="dib">
                                                        <IconButton
                                                            className="pa0"
                                                            disabled>
                                                            <Icon>error_outline</Icon>
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                                <IconButton
                                                    className="pa0"
                                                    onClick={() => this.props.selectDataset(mainIndex, dataset)}>
                                                    <Icon color="primary">arrow_forward</Icon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(filteredAllDatasets.length === 0) &&
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="error">
                                                {search[0] && "Nenhuma base de dados encontrada."}
                                                {search[0] === "" && "Nenhuma base de dados cadastrada."}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                <Grid
                    className="h-100 pa2"
                    item
                    xs={6}>
                    <Card
                        className="h-100"
                        style={{ overflowY: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ background: "white", position: "sticky", top: 0, zIndex: 100 }}>
                                        <Typography
                                            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                                            variant="h5">
                                            Coleções de dados selecionadas
                                        </Typography>
                                        <TextField
                                            className="w-100"
                                            label="Pesquisar selecionadas..."
                                            margin="normal"
                                            onChange={(event) => this.props.filterDatasets(mainIndex, [search[0], event.target.value])}
                                            style={{ marginTop: 0 }}
                                            value={search[1]} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDatasets.length > 0 && filteredDatasets.map((dataset, index) =>
                                    <TableRow key={index}>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography>{dataset.title}</Typography>
                                            <div>
                                                <Tooltip
                                                    placement="left"
                                                    title={
                                                        <React.Fragment>
                                                            <Typography style={{ color: "white" }}>{dataset.title}</Typography>
                                                            <Divider style={{ background: "white" }} />
                                                            <Typography style={{ color: "white" }}><em>{dataset.columns.join(", ")}</em></Typography>
                                                        </React.Fragment>
                                                    }>
                                                    <div className="dib">
                                                        <IconButton
                                                            className="pa0"
                                                            disabled>
                                                            <Icon>error_outline</Icon>
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                                <IconButton onClick={() => this.props.removeDataset(mainIndex, index)}>
                                                    <Icon color="error">arrow_back</Icon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filteredDatasets.length === 0 &&
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="error">
                                                {search[1] && "Nenhuma base de dados encontrada."}
                                                {search[1] === "" && "Nenhuma base de dados selecionada."}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.Data,
        page: state.Page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDatasets: () => dispatch(Actions.getDatasets()),
        selectDataset: (index, dataset) => dispatch({ type: "DATASET_SELECT", index, dataset }),
        removeDataset: (index, dataset) => dispatch({ type: "DATASET_REMOVE", index, dataset }),
        filterDatasets: (index, text) => dispatch({ type: "DATASET_SEARCH", index, text }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data)