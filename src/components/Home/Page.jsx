import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, Typography, CardActionArea, CircularProgress } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.clear()
        this.props.getPageList()
    }

    render() {
        const { search, tab } = this.props
        const { pages, status } = this.props.page

        const page = pages
            ? search === ""
                ? pages.sort((a, b) => b.created_at - a.created_at).slice(0, 5)
                : pages.filter(page => page.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)
            : []

        return (
            <div
                className="flex flex-column items-center pa2"
                style={{ background: "#fafafa" }}>
                <div className="w-100">
                    {search === "" && <Typography variant="h5">Últimas 5 visualizações criadas</Typography>}
                    {search !== "" && tab === 0 && <Typography variant="h5">Visualizações</Typography>}
                </div>
                <CircularProgress
                    className="ma5"
                    color="secondary"
                    size={50}
                    style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
                <div className="flex flex-row flex-wrap justify-center">
                    {page.map((page, index) =>
                        <Card
                            className="ma3 pa2"
                            key={index}
                            style={{ height: "fit-content", width: 420, }}>
                            <CardActionArea>
                                <Link
                                    className="link"
                                    to={"/page/view/" + page.id}>
                                    <Typography
                                        className="pb2"
                                        color="primary"
                                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                                        variant="h4">
                                        {page.title}
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
                                </Link>
                            </CardActionArea>
                        </Card>
                    )}
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