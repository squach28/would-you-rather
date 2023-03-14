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
    <div>
        <div>
            {props.firstOptionValue}: {(props.firstOptionCount / total * 100).toFixed(0)}% ({props.firstOptionCount} votes!)
        </div>
        <div>
            {props.secondOptionValue}: {(props.secondOptionCount / total * 100).toFixed(0)}% ({props.secondOptionCount} votes!)
        </div>
        <PieChart 
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