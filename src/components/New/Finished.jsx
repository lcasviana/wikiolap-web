import React from "react"

import { connect } from "react-redux"

import { Card } from "@material-ui/core"

import Graph from "components/Graph"

class Finished extends React.Component {

    render() {
        const mainIndex = this.props.index
        const { graphType, label, series, title } = this.props.page.visualizations[mainIndex]

        return (
            <div className="pa2 h-100 w-100">
                <Card className="h-100 w-100">
                    <Graph
                        index={mainIndex}
                        labels={label}
                        series={series}
                        title={title}
                        type={graphType} />
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