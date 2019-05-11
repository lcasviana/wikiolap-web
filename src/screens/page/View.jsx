import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Typography, Card, Grid, Button, AppBar, Toolbar, Icon, Dialog } from "@material-ui/core"
import { CopyToClipboard } from "react-copy-to-clipboard"
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
        const { deleteDialog, username } = this.props
        const { page, share } = this.props.page

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex mt5">
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
                    <div className="flex mt5 w-100">
                        {page &&
                            <Card className="ma3 pa2 w-100">
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
                                    <div>
                                        <Button
                                            className="button"
                                            onClick={() => this.props.sharePage("http://localhost:3000/page/view/" + page.id)}
                                            variant="outlined">
                                            Compartilhar
                                        </Button>
                                        {page.username === username &&
                                            <span>
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
                                            </span>
                                        }
                                    </div>
                                </div>
                                <Typography><strong>Usuário</strong>: {page.username}</Typography>
                                <Typography><strong>Data de criação</strong>: {Calendar.TimestampToString(page.created_at)}</Typography>
                                <Typography><strong>Última modificação</strong>: {Calendar.TimestampToString(page.updated_at)}</Typography>
                                {page.visualizations && page.visualizations.map((v, i) =>
                                    <Card
                                        className="flex mt3"
                                        key={i}
                                        style={{ height: 420, }}>
                                        <Grid
                                            container
                                            style={{ height: 420, }}>
                                            <Grid
                                                className="pa3"
                                                item
                                                style={{ height: 420, overflowY: "auto" }}
                                                xs={3}>
                                                <Typography variant="h6">{v.title}</Typography>
                                                <Typography>{v.description}</Typography>
                                            </Grid>
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
                                        </Grid>
                                    </Card>
                                )}
                            </Card>
                        }
                        <Dialog
                            onClose={() => this.props.sharePageClose()}
                            open={share ? share.open : false}>
                            <div className="flex items-center ma1">
                                <Typography style={{ margin: "0 1rem" }}>
                                    {share ? share.link : ""}
                                </Typography>
                                <CopyToClipboard
                                    className="button"
                                    text={share ? share.link : ""}>
                                    <Button
                                        color="primary"
                                        size="small"
                                        variant="outlined">
                                        Copiar
                                    </Button>
                                </CopyToClipboard>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.Page,
        deleteDialog: state.Page.deleteDialog,
        username: state.User.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => dispatch({ type: "PAGE_CLEAR" }),
        getPage: (id) => dispatch(Actions.getPage(id)),
        deleteDialogOpen: () => dispatch({ type: "DELETE_DIALOG_OPEN" }),
        sharePage: (link) => dispatch({ type: "PAGE_SHARE", link, }),
        sharePageClose: () => dispatch({ type: "PAGE_SHARE_CLOSE", }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)