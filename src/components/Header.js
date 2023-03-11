import React, {useState, useEffect} from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Header() {

    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log(user)
                setCurrentUser(user)
            }
        })
    }, [])

    function handleSignIn() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken 

                const user = result.user 
            })
            .catch(error => {
                const errorCode = error.code 
                const errorMessage = error.message 
                console.log(errorCode)
                console.log(errorMessage)

                const email = error.customData.email 

                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }

    function handleSignOut() {
        signOut(auth).then(() => {
            console.log('signed out!')
            setCurrentUser(undefined)
        })
        .catch(error =>
            console.error(error))
    }

    return (
        <header>
            <h1>Would you rather?</h1>
            <button onClick={currentUser ? handleSignOut : handleSignIn}>{currentUser ? "Sign Out" : "Sign In"}</button>
        </header>
    )
}

export default Header