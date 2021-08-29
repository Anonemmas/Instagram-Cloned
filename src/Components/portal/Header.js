import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserByUserId } from "../../services/Firebase"
import Drizzy from "../../images/Drizzy.jpg"
import Skeleton from "react-loading-skeleton"

export default function Header({photo:{userId = ''}}){
    const [username, setUsername] = useState(null)
    
    useEffect(() => {
       async function getUsername(){
           const [{username = ''}] = await getUserByUserId(userId)
           if(username){
            setUsername(username)
           }
       } 
        getUsername()

    }, [userId])

    // console.log(username)

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
            ) : (
                <div className="flex justify-start items-center">
                    <Skeleton 
                        style={{borderRadius: "50%", marginLeft: "1rem"}} 
                        count={1} 
                        width={48} 
                        height={48}
                    />
                    <Skeleton
                        style={{marginLeft: "1rem"}}
                        count={1} 
                        width={150} 
                        height={30}
                    />
                </div>
            )
        } 
        </div>
        
    )
}