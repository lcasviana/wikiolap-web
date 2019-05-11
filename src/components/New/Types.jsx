import React from "react"

import { connect } from "react-redux"

import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core"

import chartArea from "images/chart/area.png"
import chartBar from "images/chart/bar.png"
import chartPie from "images/chart/pie.png"

const graphs = [
    { image: chartArea, title: "Área", type: "area" },
    { image: chartBar, title: "Barra", type: "bar" },
    { image: chartPie, title: "Pizza", type: "pie" },
]

class Type extends React.Component {

    render() {
        const mainIndex = this.props.index
        const { graphType } = this.props.page.visualizations[mainIndex]

        return (
            <div className="flex justify-center h-100 items-center">
                {graphs.map((graph, index) => {
                    const background = graphType === graph.type ? "#009688" : "white"
                    const color = graphType === graph.type ? "white" : "rgba(0, 0, 0, 0.87)"
                    return (
                        <Card
                            className="card-200 ma2"
                            key={index}
                            style={{ background }}>
                            <CardActionArea onClick={() => this.props.graphTypeSelect(mainIndex, graph.type)}>
                                <CardMedia
                                    className="card-200-image"
                                    image={graph.image} />
                                <CardContent>
                                    <Typography
                                        style={{ color }}
                                        variant="button">
                                        {graph.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}
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
        graphTypeSelect: (index, graph) => { dispatch({ type: "GRAPH_TYPE_SELECT", index, graph }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Type)