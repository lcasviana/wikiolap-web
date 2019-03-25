import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Grid, Card, Select, MenuItem, FormControl, InputLabel, Button, IconButton, Icon, TextField, Divider } from "@material-ui/core"

import Graph from "components/Graph"

class Series extends React.Component {

    render() {
        const mainIndex = this.props.index
        const datasetsSelected = this.props.page.visualizations[mainIndex].datasetsSelected
        const graphType = this.props.page.visualizations[mainIndex].graphType
        const seriesLabel = this.props.page.visualizations[mainIndex].seriesLabel
        const seriesLabelIndex = this.props.page.visualizations[mainIndex].seriesLabelIndex
        const series = this.props.page.visualizations[mainIndex].series
        const seriesIndex = this.props.page.visualizations[mainIndex].seriesIndex
        const title = this.props.page.visualizations[mainIndex].title
        const columns = []
        datasetsSelected.forEach((dataset) => {
            dataset.aliasColumns.forEach((column, index) => {
                columns.push({
                    columnAlias: column,
                    columnOriginal: dataset.originalColumns[index],
                    datasetTitle: dataset.title,
                    tableId: dataset.tableId,
                    values: [],
                })
            })
        })

        return (
            <Grid
                className="h-100"
                container>
                <Grid
                    className="h-100 pa2"
                    item
                    xs={6}>
                    <Card className="h-100">
                        <Graph
                            index={mainIndex}
                            labels={seriesLabel}
                            series={series}
                            title={title}
                            type={graphType.type} />
                    </Card>
                </Grid>
                <Grid
                    className="h-100 pa2"
                    item
                    xs={6}>
                    <Card
                        className="pa3 h-100"
                        style={{ overflowY: "auto", }}>
                        <FormControl
                            fullWidth
                            style={{ flexGrow: 1, margin: "0.5rem 0", }}>
                            <InputLabel>Rótulos</InputLabel>
                            <Select
                                onChange={(event) => {
                                    this.props.selectLabels(mainIndex, columns[event.target.value], event.target.value)
                                    if (event.target.value !== -1) {
                                        this.props.getLabels(mainIndex, columns[event.target.value].tableId, columns[event.target.value].columnOriginal, 100)
                                    } else {
                                        this.props.setLabels(mainIndex, 100)
                                    }
                                }}
                                value={seriesLabelIndex}>
                                <MenuItem
                                    value={-1}>
                                    <em>Série temporal ordinal</em>
                                </MenuItem>
                                {columns.map((column, index) =>
                                    <MenuItem
                                        key={index}
                                        value={index}>
                                        {column.columnAlias} (<em>{column.datasetTitle}</em>)
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        {seriesIndex.map((serie, index) =>
                            <div
                                className="flex flex-column"
                                key={index}>
                                <Divider style={{ marginTop: "1rem", }} />
                                <div className="mt2 flex items-end w-100">
                                    <FormControl
                                        style={{ flexGrow: 1, margin: "0.5rem 0", }}>
                                        <InputLabel>Série {index + 1}</InputLabel>
                                        <Select
                                            onChange={(event) => {
                                                this.props.selectSeries(mainIndex, index, columns[event.target.value], event.target.value)
                                                this.props.getSeries(mainIndex, index, columns[event.target.value].tableId, columns[event.target.value].columnOriginal, 100)
                                            }}
                                            value={serie}>
                                            {columns.map((column, index) =>
                                                <MenuItem
                                                    key={index}
                                                    value={index}>
                                                    {column.columnAlias} (<em>{column.datasetTitle}</em>)
                                        </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <input
                                        className="ma2"
                                        onChange={(event) => this.props.changeColor(mainIndex, index, event.target.value)}
                                        style={{ width: 26, }}
                                        type="color"
                                        value={series[index].color} />
                                </div>
                                <div className="flex items-end w-100">
                                    <TextField
                                        fullWidth
                                        onChange={(event) => this.props.changeLabel(mainIndex, index, event.target.value)}
                                        placeholder={"Nome da série " + (index + 1)}
                                        value={series[index].label} />
                                    <IconButton
                                        disabled={series.length === 1}
                                        onClick={() => this.props.removeSeries(mainIndex, index)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center ma3">
                            <Button
                                onClick={() => this.props.insertSeries(mainIndex)}
                                variant="outlined">
                                Adicionar série
                            </Button>
                        </div>
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
        selectLabels: (index, data, value) => { dispatch({ type: "SERIES_LABEL_SELECT", index, data, value, }) },
        selectSeries: (index, serie, data, value) => { dispatch({ type: "SERIES_SELECT", index, serie, data, value, }) },
        insertSeries: (index) => { dispatch({ type: "SERIES_INSERT", index, }) },
        removeSeries: (index, serie) => { dispatch({ type: "SERIES_REMOVE", index, serie, }) },
        changeColor: (index, serie, value) => { dispatch({ type: "SERIES_COLOR", index, serie, value, }) },
        changeLabel: (index, serie, value) => { dispatch({ type: "SERIES_LABEL", index, serie, value, }) },
        getLabels: (index, table, column, length) => { dispatch(Actions.getLabels(index, table, column, length)) },
        setLabels: (index, length) => { dispatch({ type: "SERIES_LABEL_DEFAULT", index, length, }) },
        getSeries: (index, serie, table, column, length) => { dispatch(Actions.getSeries(index, serie, table, column, length)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Series)