import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, CardActions, Icon, IconButton, Typography, CardActionArea } from "@material-ui/core"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.getPageList()
    }

    render() {

        return (
            <div className="justify-center flex flex-row flex-wrap mb5 mt5">
                {this.props.list.map((page) =>
                    <Card
                        className="ma3 pa2"
                        key={page.id}
                        style={{ width: 200, }}>
                        <CardActionArea>
                            <Typography
                                color="primary"
                                variant="subtitle1">
                                {page.title}
                            </Typography>
                            <Typography
                                variant="body2">
                                {Calendar.TimestampToString(page.updated_at)}
                            </Typography>
                        </CardActionArea>
                        <CardActions
                            className="justify-center flex"
                            disableActionSpacing>
                            <IconButton>
                                <Icon color="primary">share</Icon>
                            </IconButton>
                            <IconButton>
                                <Icon color="primary">edit</Icon>
                            </IconButton>
                            <IconButton onClick={() => this.props.deletePage(page.id)}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </CardActions>
                    </Card>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.Page.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPageList: () => { dispatch(Actions.getPageList()) },
        deletePage: (id) => { dispatch(Actions.deletePage(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)