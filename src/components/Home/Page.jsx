import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, Typography, CardActionArea, Tooltip } from "@material-ui/core"
import { Link } from "react-router-dom"

import Graph from "components/Graph"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.clear()
        this.props.getPageList()
    }

    render() {
        const { search } = this.props
        const { pages } = this.props.page

        return (
            <div
                className="flex flex-column items-center pa2"
                style={{ background: "#fafafa" }}>
                <div className="pb2 w-100">
                    {search === "" && <Typography color="primary" variant="h5">Últimas 5 visualizações criadas</Typography>}
                    {search !== "" && <Typography color="primary" variant="h5">Visualizações</Typography>}
                    {!pages.map((page) => page.visualizations
                        .filter((v, i) => (page.title + " " + (v.title ? v.title : "Visualização " + (i + 1))).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)).length &&
                        <Typography color="error">
                            Nenhuma visualização encontrada.
                        </Typography>
                    }
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {pages.map((page) => page.visualizations
                        .filter((v, i) => (page.title + " " + (v.title ? v.title : "Visualização " + (i + 1))).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)
                        .map((v, i) =>
                            <Card
                                className="ma1 pa2"
                                key={page.id + i}
                                style={{ height: "fit-content", width: 420, }}>
                                <CardActionArea>
                                    <Tooltip
                                        placement="top"
                                        title={
                                            <React.Fragment>
                                                <Typography style={{ color: "white" }}>{page.title} - {v.title ? v.title : "Visualização " + (i + 1)}</Typography>
                                            </React.Fragment>
                                        }>
                                        <Link
                                            className="link"
                                            to={"/page/view/" + page.id}>
                                            <Typography
                                                className="pb2"
                                                color="primary"
                                                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                                variant="h6">
                                                {v.title ? v.title : "Visualização " + (i + 1)}
                                            </Typography>
                                            <Typography
                                                variant="body2">
                                                <strong>Página</strong>: {page.title}
                                            </Typography>
                                            <Typography
                                                variant="body2">
                                                <strong>Usuário</strong>: {page.username}
                                            </Typography>
                                            <Typography
                                                variant="body2">
                                                <strong>Data de criação</strong>: {Calendar.TimestampToString(page.created_at)}
                                            </Typography>
                                            <Typography
                                                variant="body2">
                                                <strong>Última modificação</strong>: {Calendar.TimestampToString(page.updated_at)}
                                            </Typography>
                                            <div className="mt3">
                                                <Graph
                                                    clean={true}
                                                    index={i}
                                                    key={i}
                                                    labels={v.label}
                                                    series={v.series}
                                                    title={v.title}
                                                    type={v.graphType} />
                                            </div>
                                        </Link>
                                    </Tooltip>
                                </CardActionArea>
                            </Card>
                        ))}
                </div>
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
        clear: () => { dispatch({ type: "PAGE_CLEAR" }) },
        getPageList: () => { dispatch(Actions.getPageList()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)