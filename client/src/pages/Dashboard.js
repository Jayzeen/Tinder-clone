import TinderCard from "react-tinder-card"
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import ChatContainer from "../components/ChatContainer"
import axios from 'axios'


const Dashboard = () => {


    const [cookies] = useCookies(['user'])
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [user, setUser] = useState(null)
    const [lastDirection, setLastDirection] = useState()

    const user_id = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('https://tinder-clone-backend-613d.onrender.com/user', {
                params: { user_id }
            })
            setUser(response.data)

        } catch (error) {
            console.error(error)
        }
    }


    // Get the match interest users for a specific user
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('https://tinder-clone-backend-613d.onrender.com/gendered-users', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data)
            
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    // Updating matches according to swipe direction
    const updateMatches = async (matchedUserId) => {
        
        try {
            await axios.put('https://tinder-clone-backend-613d.onrender.com/addmatch', {
                user_id,
                matchedUserId
            })
            getUser()

        } catch (error) {
            console.log(error)
        }

    }

    const swiped = (direction, swipedUserId) => {
        if ( direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(user_id)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))


    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers?.map((genderedUser) =>
                                <TinderCard
                                    className='swipe'
                                    key={genderedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                >
                                    <div
                                        style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                                        className='card'>
                                        <h3>{genderedUser.first_name}</h3>
                                    </div>
                                </TinderCard>
                            )}

                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard