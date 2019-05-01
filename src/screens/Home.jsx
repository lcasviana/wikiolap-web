import React from "react"

import { connect } from "react-redux"

import { AppBar, Toolbar, Card, TextField, InputAdornment, Icon, Paper, Tabs, Tab } from "@material-ui/core"

import Data from "components/Home/Data"
import Draw from "components/Draw"
import Nav from "components/Nav"
import Page from "components/Home/Page"

class Home extends React.Component {

    componentDidMount() {
        this.props.search("")
        this.props.setTab(0)
    }

    render() {
        const { search, tab } = this.props.home

        return (
            <div className="h-100 w-100">
                <Nav />
                <Draw />
                <div className="flex flex-column justify-center h-100 mb5 mt5 w-100">
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
                                placeholder="Pesquisar"
                                onChange={(event) => {
                                    this.props.search(event.target.value)
                                    if (event.target.value === "")
                                        this.props.setTab(0)
                                }}
                                variant="outlined" />
                        </Toolbar>
                    </AppBar>
                    <div className="mt5 w-100"></div>
                    <Paper
                        square
                        style={{ display: search === "" ? "none" : "inline-flex" }}>
                        <Tabs
                            className="flex w-100"
                            indicatorColor="primary"
                            onChange={(event, value) => this.props.setTab(value)}
                            textColor="primary"
                            value={tab}>
                            <Tab label="Tudo" />
                            <Tab label="Visualizações" />
                            <Tab label="Coleções de lados" />
                        </Tabs>
                    </Paper>
                    <div className="justify-center flex flex-row flex-wrap pa3 h-100 w-100">
                        <Card
                            className="h-100 w-100">
                            {(tab === 0 || tab === 1) && <Page search={search} tab={tab} />}
                            {(tab === 0 || tab === 2) && <Data search={search} tab={tab} />}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        home: state.Home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: (text) => { dispatch({ type: "HOME_SEARCH", text }) },
        setTab: (tab) => { dispatch({ type: "HOME_TAB", tab }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)