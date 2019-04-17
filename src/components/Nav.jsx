import React from "react"

import { connect } from "react-redux"

import { AppBar, Icon, IconButton, Toolbar } from "@material-ui/core"

import User from "components/User"
import Logo from "images/wikiolap.png"

class Nav extends React.Component {

    render() {
        return (
            <AppBar
                color="default"
                position="fixed"
                style={{ height: "4rem", }}>
                <Toolbar
                    className="flex justify-between"
                    style={{ height: "4rem", }}
                    variant="regular">
                    <div className="flex items-center">
                        <IconButton onClick={() => this.props.drawerOpen()}>
                            <Icon color="primary">menu</Icon>
                        </IconButton>
                        <img
                            alt="Wikiolap"
                            className="nav-logo pl3 pr3"
                            src={Logo} />
                    </div>
                    <User />
                </Toolbar>
            </AppBar>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        drawerOpen: () => { dispatch({ type: "DRAWER_OPEN", }) },
    }
}

export default connect(null, mapDispatchToProps)(Nav)