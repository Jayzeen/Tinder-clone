import Chat from "./Chat"
import ChatInput from "./ChatInput"
import axios from 'axios'
import { useEffect, useState } from 'react'


const ChatDisplay = ({ user, clickedUser }) => {

    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const [ userMessages, setUserMessages ] = useState(null)
    const [ clickedUserMessages, setClickedUserMessages ] = useState(null)

    // Senders messages
    const getUserMessages = async () => {
        try {
            const response = await axios.get('https://tinder-clone-backend-613d.onrender.com/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }

            })
            setUserMessages(response.data)
            
        } catch (error) {
            console.log(error)
        }

    }

    // Recipients messages
    const getClickedUserMessages = async () => {
        try {
            const response = await axios.get('https://tinder-clone-backend-613d.onrender.com/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }

            })
            setClickedUserMessages(response.data)
            
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        getUserMessages()
        getClickedUserMessages()
    }, [userMessages, clickedUserMessages])

    const messages = []

    // Formatting messages shown in chat
    userMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUserMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))


    return (
        <div>
            <Chat descendingOrderMessages={descendingOrderMessages}/>
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                getUserMessages={getUserMessages}
                getClickedUserMessages={getClickedUserMessages} 
            />
        </div>
    )
}

export default ChatDisplay