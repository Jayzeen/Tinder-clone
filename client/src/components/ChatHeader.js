import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const ChatHeader = ({ user }) => {

    const [ cookies, removeCookie ] = useCookies(['user'])

    let navigate = useNavigate()

    // Loging out from account by using Chat Header button
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        // window.location.reload()
        navigate('/')
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"Photo of " + user.first_name}/> 
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}

export default ChatHeader