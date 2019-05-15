import React from "react"

import { connect } from "react-redux"

import { Card, Button } from "@material-ui/core"

import Data from "components/New/Data"
import Finished from "components/New/Finished"
import Layout from "components/New/Description"
import Series from "components/New/Series"
import Steps from "components/New/Steps"
import Types from "components/New/Types"

class Visualization extends React.Component {

    render() {
        const mainIndex = this.props.index
        const visualizations = this.props.page.visualizations.length === 1
        const stepActual = this.props.page.visualizations[mainIndex].step
        const graph = !this.props.page.visualizations[mainIndex].graphType
        const datasets = this.props.page.visualizations[mainIndex].datasets.length < 1
        const series = this.props.page.visualizations[mainIndex].seriesIndex.filter(s => s === -1).length !== 0

        return (
            <Card className="ma3 pa3">
                <Steps step={stepActual} />
                <div style={{ height: 420 }}>
                    {stepActual === 0 && <Types index={mainIndex} />}
                    {stepActual === 1 && <Data index={mainIndex} />}
                    {stepActual === 2 && <Series index={mainIndex} />}
                    {stepActual === 3 && <Layout index={mainIndex} />}
                    {stepActual === 4 && <Finished index={mainIndex} />}
                </div>
                <div className="flex justify-between">
                    <Button
                        className="button"
                        disabled={visualizations}
                        onClick={() => this.props.deleteVisualization(mainIndex)}
                        variant="outlined">
                        Deletar
                    </Button>
                    <div>
                        <Button
                            className="button"
                            disabled={stepActual === 0}
                            onClick={() => this.props.prevStep(mainIndex)}
                            variant="contained">
                            Voltar
                        </Button>
                        <Button
                            className="button"
                            color="primary"
                            disabled={
                                (graph && stepActual === 0) ||
                                (datasets && stepActual === 1) ||
                                (series && stepActual === 2) ||
                                stepActual === 4
                            }
                            onClick={() => this.props.nextStep(mainIndex)}
                            variant="contained">
                            {stepActual >= 3 ? "Pronto" : "Avançar"}
                        </Button>
                    </div>
                </div>
            </Card>
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
        deleteVisualization: (index) => { dispatch({ type: "VISUALIZATION_DELETE", index }) },
        nextStep: (index) => { dispatch({ type: "STEP_NEXT", index }) },
        prevStep: (index) => { dispatch({ type: "STEP_PREV", index }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualization)