import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import logo from "images/wikiolap.png"

class Home extends React.Component {
    render() {
        return (
            <div className="flex justify-center mb5 mt5 w-100">
                <img
                    alt="Wikiolap"
                    className="pa6"
                    src={logo} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        savePage: (page) => { dispatch(Actions.savePage(page)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)