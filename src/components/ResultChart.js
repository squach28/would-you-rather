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
            {props.firstOptionValue}: <p className={props.votedFor ? "bold" : ""}>{(props.firstOptionCount / total * 100).toFixed(0)}% ({props.firstOptionCount} votes!)</p>
        </div>
        <div className="option-container">
            <div id="second-option-color" className="option-color-box"></div>
            {props.secondOptionValue}: {(props.secondOptionCount / total * 100).toFixed(0)}% ({props.secondOptionCount} votes!)
        </div>
        <PieChart
            className="pie-chart" 
            data={[
                { title: props.firstOptionValue, value: props.firstOptionCount, color: 'rgb(216, 118, 118)'},
                { title: props.secondOptionValue, value: props.secondOptionCount, color: 'rgb(137, 137, 205)'}
            ]}
            startAngle={90}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={labelStyle}
        />

    </div>
  )
}

export default ResultChart