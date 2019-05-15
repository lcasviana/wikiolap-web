import React from "react"

import { connect } from "react-redux"

import { Drawer, List, ListItem, ListItemIcon, Icon, ListItemText, ListSubheader } from "@material-ui/core"
import { Link } from "react-router-dom"

import iconHome from "images/wikiolap.ico"
import iconData from "images/data.png"
import iconPage from "images/page.png"

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
                    <Link
                        className="link"
                        to="/">
                        <ListItem button>
                            <ListItemIcon>
                                <img
                                    alt="Visualizações"
                                    src={iconHome}
                                    style={{ height: 24 }} />
                            </ListItemIcon>
                            <ListItemText>Página inicial</ListItemText>
                        </ListItem>
                    </Link>
                    <ListSubheader>Visualizações</ListSubheader>
                    <Link
                        className="link"
                        to="/page/new/">
                        <ListItem button>
                            <ListItemIcon>
                                <img
                                    alt="Visualizações"
                                    src={iconPage}
                                    style={{ height: 24 }} />
                            </ListItemIcon>
                            <ListItemText>Criar visualização</ListItemText>
                        </ListItem>
                    </Link>
                    <DrawItem
                        icon="view_module"
                        path="/page/list/"
                        text="Listar visualizações" />
                    <ListSubheader>Coleções de dados</ListSubheader>
                    <Link
                        className="link"
                        to="/data/new/">
                        <ListItem button>
                            <ListItemIcon>
                                <img
                                    alt="Coleções de dados"
                                    src={iconData}
                                    style={{ height: 24 }} />
                            </ListItemIcon>
                            <ListItemText>Carregar coleções de dados</ListItemText>
                        </ListItem>
                    </Link>
                    <DrawItem
                        icon="view_headline"
                        path="/data/list/"
                        text="Listar coleções de dados" />
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
        drawerClose: () => { dispatch({ type: "DRAWER_CLOSE" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw)