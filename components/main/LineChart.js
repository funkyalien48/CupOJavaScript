import React from 'react'
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
Chart.register(...registerables);

const LineChart = (props) => {

    return (
        <Line 
            data={props.chartData}
        />
    )
}

export default LineChart