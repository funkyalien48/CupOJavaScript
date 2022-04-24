import React from 'react'
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
Chart.register(...registerables);
import fire from '../fire'

const LineChart = (props) => {

    return (
        <Line 
            data={props.chartData}
        />
    )
}

export default LineChart