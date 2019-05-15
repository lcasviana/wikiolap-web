import React from "react"

import { connect } from "react-redux"

import { AppBar, Icon, IconButton, Toolbar, TextField, InputAdornment } from "@material-ui/core"

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
                        <img
                            alt="Wikiolap"
                            className="nav-logo pl3 pr3"
                            src={Logo} />
                    </div>
                    {this.props.show &&
                        <TextField
                            className="ml3 mr3 w-50"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <Icon
                                            color="primary"
                                            className="mr2">
                                            search
                                        </Icon>
                                    </InputAdornment>
                                ),
                            }}
                            label={this.props.searchLabel}
                            onChange={(event) => this.props.onChangeFunction(event.target.value)}
                            style={{ background: "#e0f2f1", minWidth: 500, borderRadius: "5px 5px 0 0" }}
                            variant="filled" />
                    }
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
        drawerOpen: () => { dispatch({ type: "DRAWER_OPEN" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)