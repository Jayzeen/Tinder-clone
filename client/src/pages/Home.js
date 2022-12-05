import Navbar from "../components/Navbar"
import AuthModal from "../components/AuthModal"

import { useCookies } from 'react-cookie'
import { useState } from "react"


const Home = () => {

    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [ cookies, removeCookie ] = useCookies(['user'])

    const authToken = false

    const handleClick = () => {
        if (authToken) {
            // removeCookie('UserId', cookies.UserId)
            // removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            <Navbar 
                authToken={authToken}
                minimal={false} 
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />

            <div className="home">
                <h1 className="primary-title">Swipe Right®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal 
                    setShowModal={setShowModal}
                    isSignUp={isSignUp}
                    />
                )}

            </div>
        </div>
    )
}

export default Home