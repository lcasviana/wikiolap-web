import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { CircularProgress, Card, CardActions, Icon, IconButton, Button, Typography, CardActionArea, TextField, AppBar, Toolbar, InputAdornment, Dialog } from "@material-ui/core"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
// import Graph from "components/Graph"
import Nav from "components/Nav"

import DeleteDialog from "components/DeleteDialog"
import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.clear()
        this.props.getPageList()
    }

    render() {
        const { deleteDialog, pages, search, share, status } = this.props.page
        const { username } = this.props

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex flex-column mb5 mt5 pa3">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", top: "4rem", }}>
                        <Toolbar>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <Icon className="mr2">search</Icon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Pesquisar visualizações"
                                onChange={(event) => this.props.searchPage(event.target.value)}
                                variant="outlined" />
                        </Toolbar>
                    </AppBar>
                    <div
                        className="justify-center mt5"
                        style={{ display: status !== "LOADING" ? "none" : "flex" }} >
                        <CircularProgress
                            className="ma5"
                            color="secondary"
                            size={100} />
                    </div>
                    <Card
                        className="justify-center flex flex-row flex-wrap mt5 w-100"
                        style={{ background: "#fafafa" }}>
                        {status === "DONE" && pages.filter(page => page.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1).map((page, index) =>
                            <Card
                                className="ma3 pa2"
                                key={index}
                                style={{ width: 300, }}>
                                <DeleteDialog
                                    id={page.id}
                                    open={deleteDialog}
                                    redirect={false} />
                                <CardActionArea>
                                    <Link
                                        className="link"
                                        to={"/page/view/" + page.id}>
                                        <Typography
                                            className="pb2"
                                            color="primary"
                                            variant="h4">
                                            {page.title}
                                        </Typography>
                                        {/* <Graph
                                            index={index}
                                            labels={page.seriesLabel}
                                            series={page.series}
                                            title={page.title}
                                            type={page.graphType.type} /> */}
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
                                <CardActions
                                    className="justify-end flex"
                                    disableActionSpacing>
                                    <IconButton onClick={() => this.props.sharePage("http://localhost:3000/page/view/" + page.id)}>
                                        <Icon color="primary">share</Icon>
                                    </IconButton>
                                    {page.username === username &&
                                        <div>
                                            <Link
                                                className="link"
                                                to={{ pathname: "/page/edit/", state: page, }}>
                                                <IconButton>
                                                    <Icon color="primary">edit</Icon>
                                                </IconButton>
                                            </Link>
                                            <IconButton onClick={() => this.props.deleteDialogOpen()}>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </div>
                                    }
                                </CardActions>
                            </Card>
                        )}
                    </Card>
                    <Dialog
                        onClose={() => this.props.sharePageClose()}
                        open={share ? share.open : false}>
                        <div
                            className="flex ma4"
                            style={{ width: 500 }}>
                            <Typography
                                className="overflow-auto"
                                style={{ marginRight: "1rem" }}
                                variant="h6">{share ? share.link : ""}
                            </Typography>
                            <CopyToClipboard
                                className="button"
                                text={share ? share.link : ""}>
                                <Button
                                    color="primary"
                                    variant="outlined">
                                    Copiar
                                </Button>
                            </CopyToClipboard>
                            <Button
                                className="button"
                                color="default"
                                onClick={() => this.props.sharePageClose()}
                                variant="outlined">
                                Fechar
                            </Button>
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.Page,
        username: state.User.username,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => { dispatch({ type: "PAGE_CLEAR" }) },
        getPageList: () => { dispatch(Actions.getPageList()) },
        searchPage: (text) => { dispatch({ type: "PAGE_SEARCH", text, }) },
        deleteDialogOpen: () => { dispatch({ type: "DELETE_DIALOG_OPEN" }) },
        sharePage: (link) => { dispatch({ type: "PAGE_SHARE", link, }) },
        sharePageClose: () => { dispatch({ type: "PAGE_SHARE_CLOSE", }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)