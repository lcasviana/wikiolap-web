import React from "react"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Pink from "@material-ui/core/colors/pink"
import Red from "@material-ui/core/colors/red"
import Teal from "@material-ui/core/colors/teal"

import Draw from "components/Draw"
import Nav from "components/Nav"
import Home from "screens/Home"
import PageEdit from "screens/page/Edit"
import PageList from "screens/page/List"
import PageNew from "screens/page/New"

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
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/page/edit/" component={PageEdit}></Route>
                            <Route path="/page/list/" component={PageList}></Route>
                            <Route path="/page/new/" component={PageNew}></Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider >
        )
    }
}