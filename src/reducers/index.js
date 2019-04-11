import { combineReducers } from "redux"

import Data from "reducers/Data"
import Draw from "reducers/Draw"
import Home from "reducers/Home"
import Page from "reducers/Page"
import User from "reducers/User"

export default combineReducers({
    Data,
    Draw,
    Home,
    Page,
    User,
})