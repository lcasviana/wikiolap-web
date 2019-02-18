import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Icon, Toolbar, Button, AppBar, TextField } from "@material-ui/core"
import { Link } from "react-router-dom"

import Visualization from "components/New/Visualization"

class New extends React.Component {

    render() {
        const page = this.props.page
        const title = this.props.page.title
        const visualizations = this.props.page.visualizations
        const done = this.props.page.visualizations.every(v => v.step === 4)

        return (
            <div className="flex flex-column mb5 mt5">
                {visualizations.map((visualization, index) => {
                    return (
                        <Visualization
                            index={index}
                            key={index} />
                    )
                })}
                <AppBar
                    color="default"
                    style={{ bottom: 0, height: "4rem", top: "auto", }}>
                    <Toolbar
                        className="flex justify-between"
                        style={{ height: "4rem", }}>
                        <Button
                            color="primary"
                            onClick={() => this.props.insertVisualization()}
                            size="large"
                            variant="outlined">
                            <Icon>add</Icon>
                        </Button>
                        <TextField
                            className="flex"
                            placeholder="Título da página"
                            onChange={(event) => this.props.changeTitle(event.target.value)}
                            style={{ flexGrow: 1, margin: "0 3rem", maxWidth: 500, }}
                            value={title} />
                        <Link
                            className="link"
                            to="/">
                            <Button
                                disabled={!done || title === ""}
                                color="primary"
                                onClick={() => this.props.savePage(page)}
                                size="large"
                                variant="outlined">
                                <Icon>done</Icon>
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
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
        changeTitle: (text) => { dispatch({ type: "PAGE_TITLE", text }) },
        insertVisualization: () => { dispatch({ type: "VISUALIZATION_INSERT", }) },
        savePage: (page) => { dispatch(Actions.savePage(page)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)