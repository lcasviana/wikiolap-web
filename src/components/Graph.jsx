import React from "react"

import { Bar, Line, Pie } from "react-chartjs-2"

import * as Color from "services/Color"

export default class Draw extends React.Component {

    render() {
        const data = {}
        const type = this.props.type
        const options = {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: this.props.title ? this.props.title : "Visualização " + (this.props.index + 1),
            }
        }

        if (this.props.series.length) {
            data.labels = this.props.labels ? this.props.labels.values : []
            data.datasets = this.props.series.filter(s => s.label).map((serie) => {
                return {
                    label: serie.label,
                    data: serie.values,
                    backgroundColor: Color.hexToRgbA(serie.color),
                }
            })
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
                {type === "line"
                    && <Line
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