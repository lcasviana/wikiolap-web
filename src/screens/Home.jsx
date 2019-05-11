import React from "react"

import { connect } from "react-redux"

import { Card, Paper, Tabs, Tab } from "@material-ui/core"

import Data from "components/Home/Data"
import Draw from "components/Draw"
import Nav from "components/Nav"
import Page from "components/Home/Page"

class Home extends React.Component {

    componentDidMount() {
        this.props.setTab(0)
        this.props.search("")
    }

    render() {
        const { search, tab } = this.props.home

        return (
            <div className="h-100 w-100">
                <Nav
                    show={true}
                    onChangeFunction={this.props.search}
                    searchLabel={"Pesquisar..."} />
                <Draw />
                <div className="flex flex-column justify-center h-100 mt5 w-100">
                    <div className="justify-center flex flex-row flex-wrap pa3 h-100 w-100">
                        <Card className="h-100 w-100">
                            <Paper
                                className="w-100"
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
        search: (text) => dispatch({ type: "HOME_SEARCH", text }),
        setTab: (tab) => dispatch({ type: "HOME_TAB", tab })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)