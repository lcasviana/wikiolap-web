import React from "react"

import { Bar, Line, Pie } from "react-chartjs-2"

import * as Color from "services/Color"

export default class Draw extends React.Component {

    render() {
        const data = {}
        const { clean, index, labels, series, title, type } = this.props
        const options = {
            legend: {
                display: !Boolean(clean)
            },
            maintainAspectRatio: false,
            title: {
                display: !Boolean(clean),
                text: title ? title : "Visualização " + (index + 1),
            },
        }

        if (series.length) {
            data.labels = labels ? clean ? labels.values.slice(0, 10) : labels.values : []
            data.datasets = series.map((serie, index) => ({
                label: serie.label ? serie.label : "Série " + (index + 1),
                data: clean ? serie.values.slice(0, 10) : serie.values,
                backgroundColor: type === "pie" ? clean ? serie.color.slice(0, 10) : serie.color : Color.hexToRgbA(serie.color),
            }))
        }

        return (
            <div className="flex items-center h-100 w-100">
                {type === "area"
                    && <Line
                        data={data}
                        options={options} />
                }
                {type === "bar"
                    && <Bar
                        data={data}
                        options={options} />
                }
                {type === "pie"
                    && <Pie
                        data={data}
                        options={options} />
                }
            </div>
        )
    }
}