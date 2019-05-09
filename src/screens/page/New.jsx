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

        console.log(visualizations[0])

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex flex-column mb5 mt5">
                    <AppBar
                        color="default"
                        style={{ bottom: "auto", height: "4rem", top: "4rem", }}>
                        <Toolbar
                            className="flex justify-between"
                            style={{ height: "4rem", }}>
                            <TextField
                                className="flex"
                                placeholder="Título da página"
                                onChange={(event) => this.props.changeTitle(event.target.value)}
                                style={{ flexGrow: 1, maxWidth: 500, }}
                                variant="outlined" />
                            <div>
                                <Button
                                    color="primary"
                                    className="pr2"
                                    onClick={() => this.props.insertVisualization()}
                                    size="large"
                                    variant="outlined">
                                    <Icon>add</Icon>
                                    Adicionar visualização
                                </Button>
                                <Link
                                    className="link pl2"
                                    onClick={(event) => { if (!done || title === "") { event.preventDefault() } }}
                                    to="/">
                                    <Button
                                        disabled={!done || title === ""}
                                        color="primary"
                                        onClick={() => {
                                            this.props.page.update
                                                ? this.props.updatePage({ ...page, username })
                                                : this.props.savePage({ ...page, username })
                                        }}
                                        size="large"
                                        variant="outlined">
                                        <Icon>done</Icon>
                                        Finalizar
                                    </Button>
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="mt5">
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
        editPage: (page) => dispatch({ type: "PAGE_EDIT", page, }),
        changeTitle: (text) => dispatch({ type: "PAGE_TITLE", text, }),
        insertVisualization: () => dispatch({ type: "VISUALIZATION_INSERT", }),
        savePage: (page) => dispatch(Actions.savePage(page)),
        updatePage: (page) => dispatch(Actions.updatePage(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)