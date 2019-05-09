import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Typography, Card, Grid, Button, AppBar, Toolbar, Icon } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

import DeleteDialog from "components/DeleteDialog"
import Graph from "components/Graph"

import * as Calendar from "services/Calendar"

class View extends React.Component {

    componentDidMount() {
        this.props.clear()
        if (/^\/page\/view\/[a-zA-Z0-9]+$/.test(this.props.location.pathname)) {
            this.props.getPage(this.props.location.pathname.substring(11))
        } else {
            throw new Error('Bad URL')
        }
    }

    render() {
        const { deleteDialog, page, username } = this.props

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex mb5 mt5">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", margin: 0, padding: 0, top: "4rem" }}>
                        <Toolbar style={{ height: "4rem", margin: 0, padding: "0 1rem" }}>
                            <Link
                                className="link"
                                to="/page/list/">
                                <Button
                                    variant="outlined">
                                    <Icon>arrow_back</Icon>
                                    Voltar
                            </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <div className="flex mb5 mt5 w-100">
                        {page &&
                            <Card className="ma3 pa3 w-100">
                                <DeleteDialog
                                    id={page.id}
                                    open={deleteDialog}
                                    redirect={true} />
                                <div className="flex justify-between">
                                    <Typography
                                        color="primary"
                                        variant="h5">
                                        {page.title}
                                    </Typography>
                                    {page.username === username &&
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
                                            <Button
                                                className="button"
                                                onClick={() => this.props.deleteDialogOpen()}
                                                variant="outlined">
                                                Excluir
                                        </Button>
                                        </div>
                                    }
                                </div>
                                <Typography><strong>Usuário</strong>: {page.username}</Typography>
                                <Typography><strong>Data de criação</strong>: {Calendar.TimestampToString(page.created_at)}</Typography>
                                <Typography><strong>Última modificação</strong>: {Calendar.TimestampToString(page.updated_at)}</Typography>
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
                                                xs={9}>
                                                <Graph
                                                    index={i}
                                                    labels={v.label}
                                                    series={v.series}
                                                    title={v.title}
                                                    type={v.graphType} />
                                            </Grid>
                                            <Grid
                                                className="overflow-container pa3"
                                                item
                                                style={{ height: 420, }}
                                                xs={3}>
                                                <Typography variant="h6">{v.title}</Typography>
                                                <Typography>{v.description}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                )}
                            </Card>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.Page.page,
        deleteDialog: state.Page.deleteDialog,
        username: state.User.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => { dispatch({ type: "PAGE_CLEAR" }) },
        getPage: (id) => { dispatch(Actions.getPage(id)) },
        deleteDialogOpen: () => { dispatch({ type: "DELETE_DIALOG_OPEN" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)