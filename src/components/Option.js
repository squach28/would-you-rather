import React, { useEffect, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import '../styles/Option.css'

function Option(props) {

  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)


  useEffect(() => {
    }, [])



  return (
      <div onClick={props.vote} className="option">
        <p>{props.option}</p>
      </div> 
  )
}

export default Option