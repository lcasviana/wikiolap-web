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
                    {step === 0 && "Primeiro selecione qual tipo de gráfico será criado"}
                    {step === 1 && "Selecione uma ou mais coleções de dados dentre as cadastradas"}
                    {step === 2 && "Agora é necessário escolher as séries que irão aparecer no gráfico"}
                    {step === 3 && "Você pode dar um título e uma descrição para a visualização"}
                    {step === 4 && "Visualização pronta! Ainda é necessário apertar 'Finalizar' na barra inferior :)"}
                </Typography>
                <Stepper
                    activeStep={step}
                    alternativeLabel
                    style={{ padding: ".25rem" }}>
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