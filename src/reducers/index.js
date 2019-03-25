import { combineReducers } from "redux"

import Data from "reducers/Data"
import Draw from "reducers/Draw"
import Page from "reducers/Page"
import User from "reducers/User"

export default combineReducers({
    Data,
    Draw,
    Page,
    User,
})