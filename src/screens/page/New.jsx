import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Icon, Toolbar, Button, AppBar, TextField, Dialog, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

import Visualization from "components/New/Visualization"

class New extends React.Component {

    componentDidMount() {
        if (this.props.location.state) {
            this.props.editPage(this.props.location.state)
        } else {
            this.props.clear()
        }
    }

    render() {
        const { page } = this.props
        const { title, visualizations, alert } = page
        const done = visualizations.every(v => v.step === 4)
        const { username } = this.props.user

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex flex-column mb5 mt5">
                    <AppBar
                        color="default"
                        style={{ bottom: "0", height: "4rem", top: "auto" }}>
                        <Toolbar
                            className="flex justify-between"
                            style={{ height: "4rem" }}>
                            <Button
                                color="primary"
                                className="pr2"
                                onClick={() => this.props.insertVisualization()}
                                size="large"
                                style={{ width: 300 }}
                                variant="contained">
                                <Icon className="mr2">add</Icon>
                                Adicionar visualização
                                </Button>
                            <TextField
                                className="flex"
                                label="Título da página"
                                onChange={(event) => this.props.changeTitle(event.target.value)}
                                style={{ flexGrow: 1, background: "#e0f2f1", maxWidth: 500, borderRadius: "5px 5px 0 0" }}
                                value={title}
                                variant="filled" />
                            <Link
                                className="link pl2"
                                onClick={(event) => {
                                    if (!done || title === "") {
                                        this.props.alertUser(true)
                                        event.preventDefault()
                                    }
                                }}
                                to="/">
                                <Button
                                    disabled={!done || title === ""}
                                    color="primary"
                                    onClick={() => {
                                        this.props.page.update
                                            ? this.props.updatePage({ ...page, username, type: 'page' })
                                            : this.props.savePage({ ...page, username, type: 'page' })
                                        this.props.refreshPage(true)
                                    }}
                                    size="large"
                                    style={{ width: 300 }}
                                    variant="contained">
                                    <Icon className="mr2">done</Icon>
                                    Finalizar criação
                                    </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <div>
                        {visualizations.map((visualization, index) => {
                            return (
                                <Visualization
                                    index={index}
                                    key={index} />
                            )
                        })}
                    </div>
                    <Dialog
                        onClose={() => this.props.alertUser(false)}
                        open={alert}>
                        <div className="ma1">
                            <Typography
                                className="w-100"
                                color="error"
                                variant="h5">
                                O que falta :(
                            </Typography>
                            {title === "" &&
                                <Typography
                                    className="w-100"
                                    variant="h6">
                                    ● Dê um título no campo 'Título da página' na barra inferior
                                </Typography>
                            }
                            {!done &&
                                <Typography
                                    className="w-100"
                                    variant="h6">
                                    ● Existem visualizações que não estão prontas
                                </Typography>
                            }
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
        user: state.User,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => dispatch({ type: "PAGE_CLEAR" }),
        editPage: (page) => dispatch({ type: "PAGE_EDIT", page }),
        changeTitle: (text) => dispatch({ type: "PAGE_TITLE", text }),
        insertVisualization: () => dispatch({ type: "VISUALIZATION_INSERT" }),
        savePage: (page) => dispatch(Actions.savePage(page)),
        updatePage: (page) => dispatch(Actions.updatePage(page)),
        refreshPage: (refresh) => dispatch({ type: "HOME_REFRESH", refresh }),
        alertUser: (alert) => dispatch({ type: "PAGE_ALERT", alert })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)