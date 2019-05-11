import React from "react"

import { connect } from "react-redux"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Pink from "@material-ui/core/colors/pink"
import Red from "@material-ui/core/colors/red"
import Teal from "@material-ui/core/colors/teal"

import Home from "screens/Home"
import PageList from "screens/page/List"
import PageNew from "screens/page/New"
import PageView from "screens/page/View"
import DataList from "screens/data/List"
import DataNew from "screens/data/New"
import DataView from "screens/data/View"
import UserSignIn from "screens/user/SignIn"
import UserSignUp from "screens/user/SignUp"

const theme = createMuiTheme({
    palette: {
        primary: Teal,
        secondary: Pink,
        error: Red,
    },
    typography: {
        useNextVariants: true,
    }
})

const PrivateRoute = ({ component: Componet, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.auth
            ? <Componet {...props} />
            : <Redirect to="/user/signin/" />
    )} />
)

class App extends React.Component {

    render() {
        const auth = this.props.user.isAuthenticated

        return (
            <MuiThemeProvider theme={theme}>
                <div className="overflow-auto">
                    <BrowserRouter>
                        <Switch>
                            <PrivateRoute auth={auth} path="/" exact component={Home} />
                            <PrivateRoute auth={auth} path="/page/edit/" component={PageNew} />
                            <PrivateRoute auth={auth} path="/page/list/" component={PageList} />
                            <PrivateRoute auth={auth} path="/page/new/" component={PageNew} />
                            <PrivateRoute auth={auth} path="/page/view/" component={PageView} />
                            <PrivateRoute auth={auth} path="/data/list/" component={DataList} />
                            <PrivateRoute auth={auth} path="/data/new/" component={DataNew} />
                            <PrivateRoute auth={auth} path="/data/view/" component={DataView} />
                            <Route path="/user/signin/" component={UserSignIn} />
                            <Route path="/user/signup/" component={UserSignUp} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.User
    }
}

export default connect(mapStateToProps, null)(App)