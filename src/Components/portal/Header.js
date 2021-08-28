import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserByUserId } from "../../services/Firebase"
import Drizzy from "../../images/Drizzy.jpg"

export default function Header({photo:{userId = ''}}){
    const [username, setUsername] = useState(null)
    
    useEffect(() => {
       async function getUsername(){
           const [{username = ''}] = await getUserByUserId(userId)
           if(username){
            setUsername(username)
           }
       } 
       if(userId){
        getUsername()
        }
    }, [userId])

    return (
        <div className="h-20 border-b flex items-center">
            { username ? (
                <>
                    <div className="h-12 w-12 ml-4">
                        <img className="rounded-full" src={Drizzy} alt="profile"/>
                    </div>
                    <Link to={`/p/${username}`}>
                        <span className="font-semibold ml-4">{username}</span>
                    </Link>
                </>
            ) : <p>Loading...</p>
        } 
        </div>
        
    )
}