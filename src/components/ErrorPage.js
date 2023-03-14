import React from 'react'
import errorImage from '../assets/images/error.JPG'
import '../styles/ErrorPage.css'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="error-container">
        <h1 className="error-header">Uh oh!!!! This page doesn't exist</h1>
        <img className="error-image" src={errorImage} alt="steve harvey looking sussy"/>
        <p className="error-details">If it did, Steve Harvey wouldn't be looking at you. Click <Link to="/"><span class="bold">here</span></Link> to go back to the home page.</p>
    </div>
  )
}

export default ErrorPage