import React from "react"

import { connect } from "react-redux"

import { Card } from "@material-ui/core"

import Graph from "components/Graph"

class Finished extends React.Component {

    render() {
        const mainIndex = this.props.index
        const graphType = this.props.page.visualizations[mainIndex].graphType
        const seriesLabel = this.props.page.visualizations[mainIndex].seriesLabel
        const series = this.props.page.visualizations[mainIndex].series
        const title = this.props.page.visualizations[mainIndex].title

        return (
            <div className="pa2 h-100 w-100">
                <Card className="h-100 w-100">
                    <Graph
                        index={mainIndex}
                        labels={seriesLabel}
                        series={series}
                        title={title}
                        type={graphType.type} />
                </Card>
            </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Finished)