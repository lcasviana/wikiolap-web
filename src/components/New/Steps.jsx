import React from "react"

import { Stepper, Step, StepLabel } from "@material-ui/core"

const titles = [
    "Tipos",
    "Dados",
    "Séries",
    "Layout",
]

export default class Steps extends React.Component {

    render() {
        return (
            <Stepper
                activeStep={this.props.step}
                alternativeLabel
                style={{ padding: ".25rem", }}>
                {titles.map((title, index) =>
                    <Step key={index}>
                        <StepLabel>{title}</StepLabel>
                    </Step>
                )}
            </Stepper>
        )
    }
}