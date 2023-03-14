import React from 'react'
import errorImage from '../assets/images/error.JPG'
import '../styles/ErrorPage.css'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="error-container">
        <h1>This page doesn't exist</h1>
        <img className="error-image" src={errorImage} alt="steve harvey looking sussy"/>
        <p>Not sure where you're trying to go, but click <Link to="/">here</Link> to go back to the home page.</p>
    </div>
  )
}

export default ErrorPage