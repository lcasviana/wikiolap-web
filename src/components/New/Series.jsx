import React from "react"

import { connect } from "react-redux"

import { Grid, Card, Select, MenuItem, FormControl, InputLabel, Button, IconButton, Icon, TextField, Divider } from "@material-ui/core"

import Graph from "components/Graph"

class Series extends React.Component {

    render() {
        const mainIndex = this.props.index
        const { datasets, graphType, label, labelIndex, series, seriesIndex, title } = this.props.page.visualizations[mainIndex]

        const columns = []
        datasets.forEach((dataset) => {
            dataset.columns.forEach((column, index) => {
                const values = []
                dataset.data.forEach(row => values.push(row[index]))
                columns.push({
                    column,
                    index,
                    datasetTitle: dataset.title,
                    values,
                })
            })
        })

        const space = graphType === "pie" ? "calc(100% - 50px)" : "calc(100% - 100px)"

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
                            labels={label}
                            series={series}
                            title={title}
                            type={graphType} />
                    </Card>
                </Grid>
                <Grid
                    className="h-100 pa2"
                    item
                    xs={6}>
                    <Card
                        className="pa3 h-100"
                        style={{ overflowY: "auto" }}>
                        <FormControl
                            fullWidth
                            style={{ flexGrow: 1, margin: "0.5rem 0" }}>
                            <InputLabel>Rótulos</InputLabel>
                            <Select
                                onChange={(event) => {
                                    if (event.target.value !== -1) this.props.selectLabels(mainIndex, columns[event.target.value], event.target.value)
                                    else this.props.selectDefault(mainIndex)
                                }}
                                value={labelIndex}>
                                <MenuItem
                                    value={-1}>
                                    <em>Série temporal ordinal</em>
                                </MenuItem>
                                {columns.map((column, index) =>
                                    <MenuItem
                                        key={index}
                                        value={index}>
                                        {column.column} (<em>{column.datasetTitle}</em>)
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        {seriesIndex.map((serie, index) =>
                            <div
                                className="flex flex-column"
                                key={index}>
                                <Divider style={{ marginTop: "1rem" }} />
                                <div className="mb3 mt3 flex items-end w-100">
                                    <div
                                        className="flex items-end"
                                        style={{ width: space }}>
                                        <div className="pr1 w-50">
                                            <FormControl
                                                className="w-100"
                                                style={{ margin: "1px 0 0 0" }}>
                                                <InputLabel>Série {index + 1}</InputLabel>
                                                <Select
                                                    onChange={(event) => {
                                                        this.props.selectSeries(mainIndex, index, columns[event.target.value], event.target.value)
                                                        if (labelIndex === -1) this.props.selectDefault(mainIndex)
                                                        this.props.changeLabel(mainIndex, index, columns[event.target.value].column)
                                                    }}
                                                    value={serie}>
                                                    {columns.map((column, index) =>
                                                        <MenuItem
                                                            key={index}
                                                            value={index}>
                                                            {column.column} (<em>{column.datasetTitle}</em>)
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="pl1 pr1 w-50">
                                            <TextField
                                                className="w-100"
                                                onChange={(event) => this.props.changeLabel(mainIndex, index, event.target.value)}
                                                placeholder={"Nome da série " + (index + 1)}
                                                style={{ flexGrow: 1 }}
                                                value={series[index].label} />
                                        </div>
                                    </div>
                                    {graphType !== "pie" && <input
                                        className="ma2"
                                        onChange={(event) => this.props.changeColor(mainIndex, index, event.target.value)}
                                        style={{ width: 26 }}
                                        type="color"
                                        value={series[index].color} />}
                                    <IconButton
                                        disabled={series.length === 1}
                                        onClick={() => this.props.removeSeries(mainIndex, index)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            </div>
                        )}
                        <Divider />
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
        selectLabels: (index, data, value) => dispatch({ type: "SERIES_LABEL_SELECT", index, data, value }),
        selectDefault: (index) => dispatch({ type: "SERIES_LABEL_DEFAULT", index }),
        selectSeries: (index, serie, data, value) => dispatch({ type: "SERIES_SELECT", index, serie, data, value }),
        insertSeries: (index) => dispatch({ type: "SERIES_INSERT", index }),
        removeSeries: (index, serie) => dispatch({ type: "SERIES_REMOVE", index, serie }),
        changeColor: (index, serie, value) => dispatch({ type: "SERIES_COLOR", index, serie, value }),
        changeLabel: (index, serie, value) => dispatch({ type: "SERIES_LABEL", index, serie, value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Series)