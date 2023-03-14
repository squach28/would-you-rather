import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import '../styles/ResultChart.css'

function ResultChart(props) {

    const total = props.firstOptionCount + props.secondOptionCount
    const labelStyle = {
        font: 'bold 5px sans-serif',
        fill: 'white'
    }

  return (
    <div className="result-chart-container">
        <div className="option-container">
            <div id="first-option-color" className="option-color-box"></div>
            {props.firstOptionValue}: {(props.firstOptionCount / total * 100).toFixed(0)}% ({props.firstOptionCount} votes!)
        </div>
        <div className="option-container">
            <div id="second-option-color" className="option-color-box"></div>
            {props.secondOptionValue}: {(props.secondOptionCount / total * 100).toFixed(0)}% ({props.secondOptionCount} votes!)
        </div>
        <PieChart
            className="pie-chart" 
            data={[
                { title: props.firstOptionValue, value: props.firstOptionCount, color: 'red'},
                { title: props.secondOptionValue, value: props.secondOptionCount, color: 'blue'}
            ]}
            startAngle={90}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={labelStyle}
        />

    </div>
  )
}

export default ResultChart