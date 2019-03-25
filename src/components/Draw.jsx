import React from "react"

import { connect } from "react-redux"

import { Drawer, List, ListItem, ListItemIcon, Icon, ListItemText, ListSubheader } from "@material-ui/core"
import { BrowserRouter, Link } from "react-router-dom"

class DrawItem extends React.Component {

    render() {
        return (
            <Link
                className="link"
                onClick={this.forceUpdate}
                to={this.props.path}>
                <ListItem button>
                    <ListItemIcon><Icon color="primary">{this.props.icon}</Icon></ListItemIcon>
                    <ListItemText>{this.props.text}</ListItemText>
                </ListItem>
            </Link>
        )
    }
}

class Draw extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Drawer
                    open={this.props.open}
                    onClose={() => this.props.drawerClose()}>
                    <List>
                        <DrawItem
                            icon="home"
                            path="/"
                            text="Início" />
                        <ListSubheader>Usuário</ListSubheader>
                        <DrawItem
                            icon="account_circle"
                            path="/user/signin/"
                            text="Login" />
                        <DrawItem
                            icon="assignment_ind"
                            path="/user/signup/"
                            text="Cadastro" />
                        <ListSubheader>Visualizações</ListSubheader>
                        <DrawItem
                            icon="add"
                            path="/page/new/"
                            text="Criar" />
                        <DrawItem
                            icon="view_module"
                            path="/page/list/"
                            text="Listar" />
                        <ListSubheader>Datasets</ListSubheader>
                        <DrawItem
                            icon="view_headline"
                            path="/data/list/"
                            text="Listar" />
                    </List>
                </Drawer>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    return {
        open: state.Draw.open,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        drawerClose: () => { dispatch({ type: "DRAWER_CLOSE", }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw)