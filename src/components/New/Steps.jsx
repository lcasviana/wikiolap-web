import React from "react"

import { Stepper, Step, StepLabel, Typography } from "@material-ui/core"

const titles = [
    "Tipos",
    "Dados",
    "Séries",
    "Descrição",
]

export default class Steps extends React.Component {

    render() {
        const { step } = this.props

        return (
            <div>
                <Typography
                    className="tc"
                    color="primary"
                    style={{ marginBottom: "1rem" }}
                    variant="h5">
                    {step === 0 && "Selecione um tipo de gráfico"}
                    {step === 1 && "Selecione as bases de dados"}
                    {step === 2 && "Selecione as séries para criar a visualização"}
                    {step === 3 && "Dê um título e uma descrição"}
                    {step === 4 && "Visualização finalizada :)"}
                </Typography>
                <Stepper
                    activeStep={step}
                    alternativeLabel
                    style={{ padding: ".25rem", }}>
                    {titles.map((title, index) =>
                        <Step key={index}>
                            <StepLabel>{title}</StepLabel>
                        </Step>
                    )}
                </Stepper>
            </div>
        )
    }
}