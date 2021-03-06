import React from "react"

import { connect } from "react-redux"
import * as Action from "actions/User"

import { Avatar, Typography, Icon, Menu, MenuItem, IconButton, Tooltip } from "@material-ui/core"
import { Link } from "react-router-dom"

import iconData from "images/data.png"
import iconPage from "images/page.png"

class User extends React.Component {

    componentDidMount() {
        this.props.signIn({ email: localStorage.getItem("email"), password: localStorage.getItem("password") })
    }

    render() {
        const { username, menu } = this.props.user

        return (
            username
                ? <div className="flex items-center pr3">
                    <Tooltip
                        placement="bottom"
                        title={
                            <React.Fragment>
                                <Typography style={{ color: "white" }}>Criar visualizações</Typography>
                            </React.Fragment>
                        }>
                        <Link
                            className="link"
                            to="/page/new/">
                            <IconButton>
                                <img
                                    alt="Visualizações"
                                    src={iconPage}
                                    style={{ height: 32 }} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip
                        placement="bottom"
                        title={
                            <React.Fragment>
                                <Typography style={{ color: "white" }}>Carregar coleções de dados</Typography>
                            </React.Fragment>
                        }>
                        <Link
                            className="link"
                            to="/data/new/">
                            <IconButton>
                                <img
                                    alt="Coleções de dados"
                                    src={iconData}
                                    style={{ height: 32 }} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <div
                        className="flex items-center"
                        onClick={(event) => {
                            this.props.userMenuOpen(event.currentTarget)
                        }}>
                        <Avatar
                            className="ml3 mr2"
                            style={{ background: "#009688" }}>
                            <IconButton>
                                <Icon style={{ color: "white" }}>face</Icon>
                            </IconButton>
                        </Avatar>
                        <Typography>
                            {username.trim().toUpperCase()}
                        </Typography>
                    </div>
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