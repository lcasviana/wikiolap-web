import React from "react"

import { connect } from "react-redux"
import * as Actions from "actions/Page"

import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

class DeleteDialog extends React.Component {

    render() {
        const { id, open, redirect } = this.props

        return (
            <Dialog
                onClose={() => this.props.deleteDialogClose()}
                open={open}>
                <DialogTitle>Deletar visualização</DialogTitle>
                <DialogContent>
                    <Typography>Você está prestes a deletar essa visualização. Confirmar deleção?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="default"
                        onClick={() => this.props.deleteDialogClose()}
                        variant="outlined">
                        Não
                    </Button>
                    {redirect &&
                        <Link
                            className="link"
                            to="/">
                            <Button
                                color="primary"
                                onClick={() => {
                                    this.props.deletePage(id)
                                    this.props.deleteDialogClose()
                                }}
                                variant="contained">
                                Sim
                            </Button>
                        </Link>
                    }
                    {!redirect &&
                        <Button
                            color="primary"
                            onClick={() => {
                                this.props.deletePage(id)
                                this.props.deleteDialogClose()
                            }}
                            variant="contained">
                            Sim
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteDialogClose: () => { dispatch({ type: "DELETE_DIALOG_CLOSE" }) },
        deletePage: (id) => { dispatch(Actions.deletePage(id)) },
    }
}

export default connect(null, mapDispatchToProps)(DeleteDialog)