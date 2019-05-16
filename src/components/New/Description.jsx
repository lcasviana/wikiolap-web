import React from "react"

import { connect } from "react-redux"

import { Grid, Card, TextField } from "@material-ui/core"

import Graph from "components/Graph"

class Layout extends React.Component {

    render() {
        const mainIndex = this.props.index
        const { graphType, series, label, title, description } = this.props.page.visualizations[mainIndex]

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
                        className="h-100 pa3"
                        style={{ overflowY: "auto" }}>
                        <TextField
                            fullWidth
                            label="Título"
                            onChange={(event) => this.props.changeTitle(mainIndex, event.target.value)}
                            style={{ margin: "0.5rem 0px" }}
                            value={title} />
                        <TextField
                            fullWidth
                            label="Descrição"
                            multiline
                            onChange={(event) => this.props.changeDescription(mainIndex, event.target.value)}
                            rowsMax="5"
                            style={{ margin: "0.5rem 0px" }}
                            value={description} />
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
        changeTitle: (index, text) => { dispatch({ type: "TITLE_CHANGE", index, text }) },
        changeDescription: (index, text) => { dispatch({ type: "DESCRIPTION_CHANGE", index, text }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)