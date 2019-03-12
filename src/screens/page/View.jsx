import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Typography, Card } from "@material-ui/core"

import Graph from "components/Graph"

class View extends React.Component {

    componentDidMount() {
        if (/^\/page\/view\/[a-zA-Z0-9]+$/.test(this.props.location.pathname)) {
            this.props.getPage(this.props.location.pathname.substring(11))
        } else {
            // Bad URL
        }
    }

    render() {
        const page = this.props.page

        return (
            <div className="flex mb5 mt5">
                {page &&
                    <Card className="ma3">
                        <Typography variant="h3">{page.title}</Typography>
                        {page.visualizations && page.visualizations.map((v, i) =>
                            <Card
                                className="ma3"
                                key={i}>
                                <Graph
                                    index={i}
                                    labels={v.seriesLabel}
                                    series={v.series}
                                    title={v.title}
                                    type={v.graphType.type} />
                                <Typography>
                                    {v.description}
                                </Typography>
                            </Card>
                        )}
                    </Card>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.Page.page,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPage: (id) => { dispatch(Actions.getPage(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)