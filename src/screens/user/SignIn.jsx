import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/User"

import { Card, TextField, Typography, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import { Link } from "react-router-dom"

import Draw from "components/Draw"
import Nav from "components/Nav"

class SignIn extends React.Component {

    componentDidMount() {
        this.props.clear()
    }

    verifyFields(event, user) {
        if ((!event || event.key === 'Enter') && user.email && user.password) {
            this.props.signIn(user)
        }
    }

    render() {
        const { username, email, password_1, popup } = this.props.user
        if (username) {
            window.location.href = "http://localhost:3000"
        }

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex justify-center align-center mb5 mt5">
                    <Card className="flex flex-column ma5 pa3">
                        <Typography
                            className="tc"
                            style={{ marginBottom: "1rem", }}
                            variant="h6">
                            Login
                        </Typography>
                        <div className="flex flex-column">
                            <TextField
                                label="Email"
                                onChange={(event) => this.props.changeEmail(event.target.value)}
                                onKeyDown={(event) => this.verifyFields(event, { email, password: password_1 })}
                                style={{ margin: "0.5rem", }}
                                value={email}
                                variant="outlined" />
                            <TextField
                                label="Senha"
                                onChange={(event) => this.props.changePassword1(event.target.value)}
                                onKeyDown={(event) => this.verifyFields(event, { email, password: password_1 })}
                                style={{ margin: "0.5rem", }}
                                type="password"
                                value={password_1}
                                variant="outlined" />
                            <div className="flex justify-center ma2">
                                <Button
                                    className="button"
                                    color="primary"
                                    onClick={() => this.verifyFields(null, { email, password: password_1 })}
                                    variant="contained">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <Divider style={{ margin: "1rem 0 1rem 0", }} />
                        <Link
                            className="link"
                            to="/user/signup/">
                            <Typography
                                className="tc"
                                color="primary">
                                Cadastre-se!
                            </Typography>
                        </Link>
                    </Card>
                </div>
                <Dialog
                    open={popup}
                    onClose={() => this.props.closeDialog()}>
                    <DialogTitle>
                        Não foi possível realizar o login
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Usuário ou senha inválidos.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={() => this.props.closeDialog()}>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.User,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => { dispatch({ type: "USER_CLEAR" }) },
        signIn: (user) => { dispatch(Actions.signIn(user)) },
        changeEmail: (text) => { dispatch({ type: "USER_EMAIL", text, }) },
        changePassword1: (text) => { dispatch({ type: "USER_PASSWORD_1", text, }) },
        closeDialog: () => { dispatch({ type: "USER_POPUP_CLOSE" }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)