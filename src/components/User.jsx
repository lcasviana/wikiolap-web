import React from "react"

import { connect } from "react-redux"
import * as Action from "actions/User"

import { Avatar, Typography, Icon, Menu, MenuItem, IconButton } from "@material-ui/core"

class User extends React.Component {

    componentDidMount() {
        this.props.signIn({ email: localStorage.getItem("email"), password: localStorage.getItem("password") })
    }

    render() {
        const { username, menu } = this.props.user

        return (
            username
                ? <div className="flex items-center">
                    <Typography>
                        {username.trim().toUpperCase()}
                    </Typography>
                    <Avatar
                        className="ml3 mr2"
                        onClick={(event) => {
                            this.props.userMenuOpen(event.currentTarget)
                        }}
                        style={{ background: "#009688" }}>
                        <IconButton>
                            <Icon style={{ color: "white" }}>face</Icon>
                        </IconButton>
                    </Avatar>
                    <Menu
                        anchorEl={menu ? menu : this}
                        open={Boolean(menu)}
                        onClose={() => this.props.userMenuClose()}>
                        <MenuItem onClick={() => {
                            this.props.userMenuClose()
                            this.props.userLogout()
                        }}>
                            Logout
                    </MenuItem>
                    </Menu>
                </div>
                : <span />
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
        signIn: (user) => { dispatch(Action.signIn(user, true)) },
        userLogout: () => { dispatch({ type: "USER_LOGOUT" }) },
        userMenuOpen: (target) => { dispatch({ type: "USER_MENU_OPEN", target }) },
        userMenuClose: () => { dispatch({ type: "USER_MENU_CLOSE" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)