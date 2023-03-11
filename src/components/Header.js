import React, {useState, useEffect} from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import '../styles/Header.css'
import { Link } from 'react-router-dom'

function Header() {

    const [currentUser, setCurrentUser] = useState(undefined)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log(user)
                setCurrentUser(user)
            }
        })
    }, [])

    // toggles the menu for users who are on mobile
    function toggleMenu() {
        setShowMenu(oldShow => !oldShow)
        console.log(showMenu)
    }

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
            {currentUser ? 
                <div onClick={toggleMenu}className="user-container">
                    <div className="user-name">
                        <p>Hello {currentUser.displayName.split(' ')[0]}</p>
                        <div className={showMenu ? "arrow-up" : "arrow-down"}></div>
                    </div>
                    {showMenu && <div className="menu">
                        <ul className="menu-list">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to="/:userId/history">History</Link>
                            </li>
                            <li onClick={handleSignOut}>
                                Sign Out
                            </li>
                        </ul>
                    </div>
                    }
                </div>
                :
                <button 
                    onClick={currentUser ? handleSignOut : handleSignIn}
                >Sign In
                </button> 

            }

        </header>
    )
}

export default Header