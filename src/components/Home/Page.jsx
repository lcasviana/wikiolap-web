import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, Typography, CardActionArea } from "@material-ui/core"
import { Link } from "react-router-dom"

import DeleteDialog from "components/DeleteDialog"
import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.clear()
        this.props.getPageList()
    }

    render() {
        const { search } = this.props
        const { pages } = this.props.page

        const lastFive = pages.sort((a, b) => b.created_at - a.created_at).slice(0, 5)

        return (
            <div>
                {lastFive.filter(page => page.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1).map((page, index) =>
                    <Card
                        className="ma3 pa2"
                        key={index}
                        style={{ width: 300, }}>
                        <DeleteDialog
                            id={page.id}
                            open={this.props.page.delete}
                            redirect={false} />
                        <CardActionArea>
                            <Link
                                className="link"
                                to={"/page/view/" + page.id}>
                                <Typography
                                    color="primary"
                                    variant="h4">
                                    {page.title}
                                </Typography>
                                <Typography
                                    variant="body2">
                                    <strong>Usuário</strong>: {page.user}
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