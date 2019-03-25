import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Typography, Card, Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

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
                    <Card className="ma3 pa3 w-100">
                        <div className="flex justify-between">
                            <Typography
                                variant="h3">
                                {page.title}
                            </Typography>
                            <div>
                                <Link
                                    className="link"
                                    to={{ pathname: "/page/edit/", state: page, }}>
                                    <Button
                                        className="button"
                                        variant="outlined">
                                        Editar
                                    </Button>
                                </Link>
                                <Link
                                    className="link"
                                    to="/">
                                    <Button
                                        className="button"
                                        onClick={() => this.props.deletePage(page.id)}
                                        variant="outlined">
                                        Excluir
                                </Button>
                                </Link>
                            </div>
                        </div>
                        {page.visualizations && page.visualizations.map((v, i) =>
                            <Card
                                className="flex mb4 mt4"
                                key={i}
                                style={{ height: 420, }}>
                                <Grid
                                    container
                                    style={{ height: 420, }}>
                                    <Grid
                                        item
                                        style={{ height: 420, }}
                                        xs={8}>
                                        <Graph
                                            index={i}
                                            labels={v.seriesLabel}
                                            series={v.series}
                                            title={v.title}
                                            type={v.graphType.type} />
                                    </Grid>
                                    <Grid
                                        className="overflow-container pa3"
                                        item
                                        style={{ height: 420, }}
                                        xs={4}>
                                        <Typography variant="h6">{v.title}</Typography>
                                        <Typography>{v.description}</Typography>
                                        {JSON.stringify(v)}
                                    </Grid>
                                </Grid>
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
        deletePage: (id) => { dispatch(Actions.deletePage(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)