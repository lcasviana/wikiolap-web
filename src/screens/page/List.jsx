import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Card, CardActions, Icon, IconButton, Typography, CardActionArea, TextField, AppBar, Toolbar, InputAdornment, Dialog } from "@material-ui/core"
import { Link } from "react-router-dom"

import * as Calendar from "services/Calendar"

class List extends React.Component {

    componentDidMount() {
        this.props.getPageList()
    }

    render() {
        return (
            <div className="flex mb5 mt5">
                <AppBar
                    color="default"
                    style={{ bottom: "auto", height: "4rem", top: "4rem", }}>
                    <Toolbar>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <Icon className="mr2">search</Icon>
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Pesquisar visualizações"
                            onChange={(event) => this.props.searchPage(event.target.value)}
                            variant="outlined" />
                    </Toolbar>
                </AppBar>
                <div className="justify-center flex flex-row flex-wrap mt5 pa3 w-100">
                    {this.props.page.pages.filter(page => page.title.toLowerCase().trim().indexOf(this.props.page.search.toLowerCase().trim()) !== -1).map((page, index) =>
                        <Card
                            className="ma3 pa2"
                            key={index}
                            style={{ width: 200, }}>
                            <CardActionArea>
                                <Link
                                    className="link"
                                    to={"/page/view/" + page.id}>
                                    <Typography
                                        color="primary"
                                        variant="subtitle1">
                                        {page.title}
                                    </Typography>
                                    <Typography
                                        variant="body2">
                                        {Calendar.TimestampToString(page.updated_at)}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                            <CardActions
                                className="justify-center flex"
                                disableActionSpacing>
                                <IconButton onClick={() => this.props.sharePage("http://localhost:3000/page/view/" + page.id)}>
                                    <Icon color="primary">share</Icon>
                                </IconButton>
                                <Link
                                    className="link"
                                    to={{ pathname: "/page/edit/", state: page, }}>
                                    <IconButton>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </Link>
                                <IconButton onClick={() => this.props.deletePage(page.id)}>
                                    <Icon>delete</Icon>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )}
                </div>
                <Dialog
                    onClose={() => this.props.sharePageClose()}
                    open={this.props.page.share.open}>
                    <Typography
                        variant="h6">{this.props.page.share.link}</Typography>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.Page,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPageList: () => { dispatch(Actions.getPageList()) },
        searchPage: (text) => { dispatch({ type: "PAGE_SEARCH", text, }) },
        deletePage: (id) => { dispatch(Actions.deletePage(id)) },
        sharePage: (link) => { dispatch({ type: "PAGE_SHARE", link, }) },
        sharePageClose: () => { dispatch({ type: "PAGE_SHARE_CLOSE", }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)