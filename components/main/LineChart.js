import React from 'react'
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
Chart.register(...registerables);

// LineChart component exports the Line component from react-chartjs-2 which takes in chartData as a prop to display the data and  style
const LineChart = (props) => {

    return (
        <Line 
            data={props.chartData}
        />
    )
}

export default LineChart