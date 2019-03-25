import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/User"

import { Card, TextField, Typography, Divider, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

class SignIn extends React.Component {

    render() {
        const { email, password_1 } = this.props.user

        return (
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
                            required
                            style={{ margin: "0.5rem", }}
                            value={email}
                            variant="outlined" />
                        <TextField
                            label="Senha"
                            onChange={(event) => this.props.changePassword1(event.target.value)}
                            required
                            style={{ margin: "0.5rem", }}
                            type="password"
                            value={password_1}
                            variant="outlined" />
                        <div className="flex justify-center ma2">
                            <Button
                                className="button"
                                color="primary"
                                onClick={() => this.props.signIn({ email, password: password_1 })}
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
        signIn: (user) => { dispatch(Actions.signIn(user)) },
        changeEmail: (text) => { dispatch({ type: "USER_EMAIL", text, }) },
        changePassword1: (text) => { dispatch({ type: "USER_PASSWORD_1", text, }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)