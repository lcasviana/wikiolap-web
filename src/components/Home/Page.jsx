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

    latestVisualizations(pages) {
        const latestVisualizations = []
        const sortedPages = pages.sort((a, b) => {
            const da = new Date(a.updated_at), db = new Date(b.updated_at)
            if (da < db) return 1
            if (da > db) return -1
            return 0
        })
        for (let p = 0; p < sortedPages.length; p++) {
            for (let v = 0; v < sortedPages[p].visualizations.length; v++) {
                if (latestVisualizations.length === 5) break
                latestVisualizations.push({
                    ...sortedPages[p],
                    visualizations: [{
                        ...sortedPages[p].visualizations[v],
                        title: sortedPages[p].visualizations[v].title ? sortedPages[p].visualizations[v].title : "Visualização " + (v + 1)
                    }]
                })
            }
        }
        return latestVisualizations
    }

    render() {
        const { search } = this.props
        const { pages } = this.props.page

        const page = pages
            ? search === ""
                ? this.latestVisualizations(pages)
                : pages
            : []

        return (
            <div
                className="flex flex-column items-center pa2"
                style={{ background: "#fafafa" }}>
                <div className="pb2 w-100">
                    {search === "" && <Typography color="primary" variant="h5">Últimas 5 visualizações criadas</Typography>}
                    {search !== "" && <Typography color="primary" variant="h5">Visualizações</Typography>}
                    {!page.map((page) => page.visualizations.map((v, i) => ({ ...v, title: v.title ? v.title : "Visualização " + (i + 1) }))
                        .filter((v, i) => (page.title + " " + v.title).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1))
                        .filter(v => v.length).length &&
                        <Typography color="error">
                            Nenhuma visualização encontrada.
                        </Typography>
                    }
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {page.map((page) => page.visualizations.map((v, i) => ({ ...v, title: v.title ? v.title : "Visualização " + (i + 1) }))
                        .filter((v, i) => (page.title + " " + v.title).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)
                        .map((v, i) =>
                            <Card
                                className="ma1 pa2"
                                key={page.id + i}
                                style={{ height: "fit-content", width: 300, }}>
                                <CardActionArea>
                                    <Tooltip
                                        placement="top"
                                        title={
                                            <React.Fragment>
                                                <Typography style={{ color: "white" }}>{page.title} - {v.title}</Typography>
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
                                                {v.title}
                                            </Typography>
                                            <Typography
                                                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
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