import React from "react"

import { connect } from "react-redux"

import { Drawer, List, ListItem, ListItemIcon, Icon, ListItemText, ListSubheader } from "@material-ui/core"
import { Link } from "react-router-dom"

class DrawItem extends React.Component {

    render() {
        return (
            <Link
                className="link"
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
            <Drawer
                open={this.props.open}
                onClick={() => this.props.drawerClose()}
                onClose={() => this.props.drawerClose()}>
                <List>
                    <DrawItem
                        icon="home"
                        path="/"
                        text="Início" />
                    <ListSubheader>Usuário</ListSubheader>
                    <DrawItem
                        icon="person"
                        path="/user/signin/"
                        text="Login" />
                    <DrawItem
                        icon="person_add"
                        path="/user/signup/"
                        text="Cadastro" />
                    <a
                        className="link"
                        href="http://localhost:8000/authentication/register">
                        <ListItem button>
                            <ListItemIcon><Icon color="primary">person_outline</Icon></ListItemIcon>
                            <ListItemText>Antigo</ListItemText>
                        </ListItem>
                    </a>
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
                    <a
                        className="link"
                        href="http://localhost:8000/base/upload_file/">
                        <ListItem button>
                            <ListItemIcon><Icon color="primary">cloud_upload</Icon></ListItemIcon>
                            <ListItemText>Upload</ListItemText>
                        </ListItem>
                    </a>
                    <DrawItem
                        icon="view_headline"
                        path="/data/list/"
                        text="Listar" />
                </List>
            </Drawer>
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