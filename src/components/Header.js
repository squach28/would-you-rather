import React, {useState, useEffect} from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { auth } from '../firebase'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

function Header(props) {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user)
            }
        })
    }, [])

    // toggles the menu for users who are on mobile
    function toggleMenu() {
        setShowMenu(oldShow => !oldShow)
    }

    function handleSignIn() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken 
                const user = result.user 
                addUser(user.uid)
                localStorage.setItem('uid', user.uid)
                window.location.reload()
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
            setCurrentUser(undefined)
            localStorage.removeItem('uid')
            window.location.reload()
        })
        .catch(error =>
            console.error(error))
    }

    // adds the user to the users collection in firestore if the user doesn't exist
    // database keeps track of user's histories
    function addUser(uid) {
        getDocs(collection(db, "users"))
            .then(result => {
                const currentUser = result.docs.filter(doc => doc.id === uid)
                if(currentUser.length <= 0) {
                    setDoc(doc(db, "users", uid), {
                        history: []
                    })
                }
            })
            .catch(error => {
                console.log(`error! ${error}`)
            })
    }

    return (
        <header>
            <h1><Link className="header" to="/">WYR?</Link></h1>
            {!props.loading ? currentUser ? 
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
                    className="sign-in-btn"
                    onClick={currentUser ? handleSignOut : handleSignIn}
                >Sign In
                </button>  : <ClipLoader />

            }

        </header>
    )
}

export default Header