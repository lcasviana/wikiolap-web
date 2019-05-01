import React from "react"

import { connect } from "react-redux"

import { AppBar, Icon, IconButton, Toolbar, Hidden } from "@material-ui/core"

import User from "components/User"
import Logo from "images/wikiolap.png"

class Nav extends React.Component {

    render() {
        const { username } = this.props.user

        return (
            <AppBar
                color="default"
                position="fixed"
                style={{ height: "4rem", padding: "0 1rem" }}>
                <Toolbar
                    className="flex justify-between"
                    style={{ height: "4rem", margin: 0, padding: 0 }}
                    variant="regular">
                    <div className="flex items-center">
                        <IconButton
                            onClick={() => this.props.drawerOpen()}
                            style={{ display: username ? "inline-flex" : "none" }}>
                            <Icon color="primary">menu</Icon>
                        </IconButton>
                        <Hidden xsDown>
                            <img
                                alt="Wikiolap"
                                className="nav-logo pl3 pr3"
                                src={Logo} />
                        </Hidden>
                    </div>
                    <User />
                </Toolbar>
            </AppBar>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return {
        drawerOpen: () => { dispatch({ type: "DRAWER_OPEN", }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)