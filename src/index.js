import React from "react"
import Thunk from 'redux-thunk'
import ReactDOM from "react-dom"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import App from "App"
import Reducers from "reducers"

import "css/styles.css"
import "tachyons"

const store = createStore(Reducers, applyMiddleware(Thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"))