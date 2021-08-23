import React from "react"
import { Link } from "react-router-dom"

export default function Header({username, profilePicture, fullName}){
    return (
        <div className="flex border-b h-4 p-4 py-8">
            <div className="flex items-center">    
                <Link className="flex" to={`/p/${username}`}> 
                    <img 
                    className="rounded-full w-8 h-8 flex mr-3 object-cover"
                    src={"https://shortest.link/Dst"}
                    alt={`${username} profile pic`}
                    />
                    <p className="font-bold">{username}</p>
                    <p>{fullName}</p>
                </Link>
            </div>
        </div>
    )
}