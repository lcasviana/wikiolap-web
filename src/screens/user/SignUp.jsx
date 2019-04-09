import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/User"

/* import { Card, TextField, Typography, Divider, Button } from "@material-ui/core"
import { Link } from "react-router-dom" */

import Draw from "components/Draw"
import Nav from "components/Nav"

class SignUp extends React.Component {

    componentDidMount() {
        window.location.href = "http://localhost:8000/authentication/register"
    }

    verify() {
        const { username, email, password_1, password_2 } = this.props.user

        if (username === "") return new Error("Usuário é requerido")
        if (email === "") return new Error("Email é requerido")
        if (password_1 === "") return new Error("Senha é requerida")
        if (password_2 === "") return new Error("Confirme a senha")
        if (password_1 !== password_2) return new Error("Senha confirmada incorretamente")

        this.props.signUp({ username, email, password: password_1 })
    }

    render() {
        /* const { username, email, password_1, password_2 } = this.props.user */

        return (
            <div>
                <Nav />
                <Draw />
                <div className="flex justify-center align-center mb5 mt5">
                    {/* <Card className="flex flex-column ma5 pa3">
                        <Typography
                            className="tc"
                            style={{ marginBottom: "1rem", }}
                            variant="h6">
                            Cadastro
                        </Typography>
                        <div className="flex flex-column">
                            <TextField
                                label="Nome"
                                onChange={(event) => this.props.changeUsername(event.target.value)}
                                style={{ margin: "0.5rem", }}
                                value={username}
                                variant="outlined" />
                            <TextField
                                label="Email"
                                onChange={(event) => this.props.changeEmail(event.target.value)}
                                style={{ margin: "0.5rem", }}
                                value={email}
                                variant="outlined" />
                            <TextField
                                label="Senha"
                                onChange={(event) => this.props.changePassword1(event.target.value)}
                                style={{ margin: "0.5rem", }}
                                type="password"
                                value={password_1}
                                variant="outlined" />
                            <TextField
                                label="Confirmar senha"
                                onChange={(event) => this.props.changePassword2(event.target.value)}
                                style={{ margin: "0.5rem", }}
                                type="password"
                                value={password_2}
                                variant="outlined" />
                            <div className="flex justify-center ma2">
                                <Button
                                    className="button"
                                    color="primary"
                                    onClick={() => this.verify()}
                                    variant="contained">
                                    Cadastrar
                                </Button>
                            </div>
                        </div>
                        <Divider style={{ margin: "1rem 0 1rem 0", }} />
                        <Link
                            className="link"
                            to="/user/signin/">
                            <Typography
                                className="tc"
                                color="primary">
                                Logar!
                            </Typography>
                        </Link>
                    </Card> */}
                </div>
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
        signUp: (user) => { dispatch(Actions.signUp(user)) },
        changeUsername: (text) => { dispatch({ type: "USER_NAME", text, }) },
        changeEmail: (text) => { dispatch({ type: "USER_EMAIL", text, }) },
        changePassword1: (text) => { dispatch({ type: "USER_PASSWORD_1", text, }) },
        changePassword2: (text) => { dispatch({ type: "USER_PASSWORD_2", text, }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)