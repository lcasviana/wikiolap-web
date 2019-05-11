import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Icon, Toolbar, Button, AppBar, TextField } from "@material-ui/core"
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
        const { title, visualizations } = page
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
                                variant="contained">
                                <Icon className="mr2">add</Icon>
                                Adicionar
                                </Button>
                            <TextField
                                className="flex"
                                label="Título da página"
                                onChange={(event) => this.props.changeTitle(event.target.value)}
                                style={{ flexGrow: 1, background: "rgba(38,166,154,0.05)", maxWidth: 500 }}
                                value={title}
                                variant="filled" />
                            <Link
                                className="link pl2"
                                onClick={(event) => { if (!done || title === "") { event.preventDefault() } }}
                                to="/">
                                <Button
                                    disabled={!done || title === ""}
                                    color="primary"
                                    onClick={() => {
                                        this.props.page.update
                                            ? this.props.updatePage({ ...page, username, type: 'page' })
                                            : this.props.savePage({ ...page, username, type: 'page' })
                                    }}
                                    size="large"
                                    variant="contained">
                                    <Icon className="mr2">done</Icon>
                                    Finalizar
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)