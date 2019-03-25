import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Data"

import { Card, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from "@material-ui/core"

class View extends React.Component {

    componentDidMount() {
        this.props.clear()
        if (/^\/data\/view\/[_a-zA-Z0-9]+$/.test(this.props.location.pathname)) {
            this.props.getDataset(this.props.location.pathname.substring(11))
        } else {
            // Bad URL
        }
    }

    mountTable = (dataset) => {
        const titles = [], head = [], body = []
        for (let title in dataset[0]) {
            if (dataset[0].hasOwnProperty(title) && title !== "id") {
                titles.push(title)
                head.push(<TableCell key={title}>{title}</TableCell>)
            }
        }
        for (let i = 0; i < dataset.length; i++) {
            const aux = []
            for (let j = 0; j < titles.length; j++) {
                aux.push(<TableCell key={(i + 1) * dataset.length + j}>{dataset[i][titles[j]]}</TableCell>)
            }
            body.push(<TableRow key={i}>{aux}</TableRow>)
        }
        return (
            <Table>
                <TableHead><TableRow>{head}</TableRow></TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        )
    }

    render() {
        const { dataset, status } = this.props.data

        return (
            <div className="flex justify-center mb5 mt5">
                <CircularProgress
                    className="ma5"
                    color="secondary"
                    size={100}
                    style={{ display: status !== "LOADING" ? "none" : "inline-block" }} />
                {dataset.length !== 0 &&
                    <Card
                        className="ma3"
                        style={{ overflowX: "scroll" }}>
                        {this.mountTable(dataset)}
                    </Card>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.Data,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataset: (id) => { dispatch(Actions.getDataset(id, 10)) },
        clear: () => { dispatch({ type: "DATASET_CLEAR" }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)