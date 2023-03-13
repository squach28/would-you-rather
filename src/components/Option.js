import React, { useEffect, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import '../styles/Option.css'

function Option(props) {

  const [gifUrl, setGifUrl] = useState('')
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)


  useEffect(() => {
    fetchGifs().then(result => {
      const randomIndex = Math.floor(Math.random() * result.data.length)
      setGifUrl(result.data[randomIndex].images.fixed_width_small.url)
    })

  })

  const fetchGifs = (offset) => gf.gifs('surprise', 'confusion')
  return (
    <div className="option">
      <img src={gifUrl} alt="woW"/>
      <p>{props.option}</p>
    </div>
  )
}

export default Option