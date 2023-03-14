import React from 'react'
import '../styles/Option.css'

function Option(props) {
  return (
      <div onClick={props.vote} className="option">
        <p>{props.option}</p>
      </div> 
  )
}

export default Option