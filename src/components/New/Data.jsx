import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Tooltip, Typography, Grid, TextField, IconButton, Icon, Card, Table, TableBody, TableRow, TableCell, TableHead, Divider } from "@material-ui/core"

class Data extends React.Component {

    componentWillMount() {
        this.props.getDatasets(this.props.index, this.props.page.visualizations[this.props.index].datasetsSearch)
    }

    handleInputSearch = (index, text) => {
        this.props.filterDatasets(index, text)
        this.props.getDatasets(index, text)
    }

    render() {
        const mainIndex = this.props.index
        const datasetsList = this.props.page.visualizations[mainIndex].datasetsList
        const datasetsSelected = this.props.page.visualizations[mainIndex].datasetsSelected
        const selectedSearch = this.props.page.visualizations[mainIndex].selectedSearch
        const datasetsSearch = this.props.page.visualizations[mainIndex].datasetsSearch

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
                        style={{ overflowY: "auto", }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ background: "white", position: "sticky", top: 0, zIndex: 100, }}>
                                        <Typography
                                            style={{ marginTop: "0.5rem", marginBottom: "0.5rem", }}
                                            variant="h5">
                                            Datasets
                                        </Typography>
                                        <TextField
                                            className="w-100"
                                            label="Pesquisar datasets..."
                                            margin="normal"
                                            onChange={(event) => this.handleInputSearch(mainIndex, event.target.value)}
                                            style={{ marginTop: 0, }}
                                            value={datasetsSearch} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datasetsList.map((dataset, index) =>
                                    <TableRow key={index}>
                                        <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                            <Typography style={{ display: "inline-block", }}>{dataset.title}</Typography>
                                            <div>
                                                <Tooltip
                                                    disableFocusListener
                                                    disableTouchListener
                                                    placement="left"
                                                    title={
                                                        <React.Fragment>
                                                            <Typography style={{ color: "white" }}>{dataset.title}</Typography>
                                                            <Divider style={{ background: "white" }} />
                                                            <Typography style={{ color: "white" }}><em>{dataset.aliasColumns.join(", ")}</em></Typography>
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
                                                    <Icon color="primary">add</Icon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {!datasetsList.length &&
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="error">
                                                Nenhum dataset encontrado.
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
                        style={{ overflowY: "auto", }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ background: "white", position: "sticky", top: 0, zIndex: 100, }}>
                                        <Typography
                                            style={{ marginTop: "0.5rem", marginBottom: "0.5rem", }}
                                            variant="h5">
                                            Selecionados
                                        </Typography>
                                        <TextField
                                            className="w-100"
                                            label="Pesquisar selecionados..."
                                            margin="normal"
                                            onChange={(event) => this.props.filterSelected(mainIndex, event.target.value)}
                                            style={{ marginTop: 0, }}
                                            value={selectedSearch} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {datasetsSelected.filter(dataset => selectedSearch === "" ? true : dataset.title.indexOf(selectedSearch) !== -1)
                                    .map((dataset, index) =>
                                        <TableRow key={index}>
                                            <TableCell style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                                <Typography>{dataset.title}</Typography>
                                                <div>
                                                    <Tooltip
                                                        disableFocusListener
                                                        disableTouchListener
                                                        placement="left"
                                                        title={
                                                            <React.Fragment>
                                                                <Typography style={{ color: "white" }}>{dataset.title}</Typography>
                                                                <Divider style={{ background: "white" }} />
                                                                <Typography style={{ color: "white" }}><em>{dataset.aliasColumns.join(", ")}</em></Typography>
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
                                                        <Icon color="error">remove</Icon>
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
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
        page: state.Page,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDatasets: (index, text) => { dispatch(Actions.getDatasets(index, text)) },
        selectDataset: (index, dataset) => { dispatch({ type: "DATASET_SELECT", index, dataset, }) },
        removeDataset: (index, dataset) => { dispatch({ type: "DATASET_REMOVE", index, dataset, }) },
        filterDatasets: (index, text) => { dispatch({ type: "DATASET_SEARCH", index, text, }) },
        filterSelected: (index, text) => { dispatch({ type: "DATASET_SELECTED_SEARCH", index, text, }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data)