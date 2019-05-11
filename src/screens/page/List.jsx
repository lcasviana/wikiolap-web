import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, CardActions, Icon, IconButton, Button, Typography, CardActionArea, Dialog, Tooltip } from "@material-ui/core"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Graph from "components/Graph"
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
                <Nav
                    show={true}
                    onChangeFunction={this.props.searchPage}
                    searchLabel={"Pesquisar visualizações..."} />
                <Draw />
                <div className="flex flex-column mt5 pa3">
                    <Card
                        className="pa2 justify-center flex flex-row flex-wrap w-100"
                        style={{ background: "#fafafa" }}>
                        <div className="w-100">
                            <Typography
                                className="pb2"
                                color="primary"
                                variant="h5">
                                Visualizações
                            </Typography>
                            {!pages.map((page) => page.visualizations.map((v, i) => ({ ...v, title: v.title ? v.title : "Visualização " + (i + 1) }))
                                .filter((v, i) => (page.title + " " + v.title).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)).length &&
                                <Typography color="error">
                                    Nenhuma visualização encontrada.
                                </Typography>
                            }
                        </div>
                        {status === "DONE" && pages.map((page) => page.visualizations.map((v, i) => ({ ...v, title: v.title ? v.title : "Visualização " + (i + 1) }))
                            .filter((v, i) => (page.title + " " + v.title).toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1)
                            .map((v, i) =>
                                <Card
                                    className="ma1 pa2"
                                    key={page.id + i}
                                    style={{ width: 300 }}>
                                    <DeleteDialog
                                        id={page.id}
                                        open={deleteDialog}
                                        redirect={false} />
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
                                                    to={{ pathname: "/page/edit/", state: page }}>
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
                            ))}
                    </Card>
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
        clear: () => dispatch({ type: "PAGE_CLEAR" }),
        getPageList: () => dispatch(Actions.getPageList()),
        searchPage: (text) => dispatch({ type: "PAGE_SEARCH", text }),
        deleteDialogOpen: () => dispatch({ type: "DELETE_DIALOG_OPEN" }),
        sharePage: (link) => dispatch({ type: "PAGE_SHARE", link }),
        sharePageClose: () => dispatch({ type: "PAGE_SHARE_CLOSE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)