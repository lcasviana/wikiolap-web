import React from "react"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Pink from "@material-ui/core/colors/pink"
import Red from "@material-ui/core/colors/red"
import Teal from "@material-ui/core/colors/teal"

import Draw from "components/Draw"
import Nav from "components/Nav"
import Home from "screens/Home"
import PageList from "screens/page/List"
import PageNew from "screens/page/New"
import PageView from "screens/page/View"
import DataList from "screens/data/List"
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

export default class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Nav />
                <Draw />
                <div className="overflow-auto">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/page/edit/" component={PageNew} />
                            <Route path="/page/list/" component={PageList} />
                            <Route path="/page/new/" component={PageNew} />
                            <Route path="/page/view/" component={PageView} />
                            <Route path="/data/list/" component={DataList} />
                            <Route path="/data/view/" component={DataView} />
                            <Route path="/user/signin/" component={UserSignIn} />
                            <Route path="/user/signup/" component={UserSignUp} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider >
        )
    }
}