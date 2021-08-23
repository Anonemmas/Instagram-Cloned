import React from "react"
import { Link } from "react-router-dom"

export default function Header({username, fullName}){
    return (
        <div className="flex border-b h-4 p-4 py-8">
            <div className="flex items-center">    
                <Link className="flex" to={`/p/${username}`}> 
                    <img 
                    className="rounded-full w-8 h-8 flex mr-3 object-cover"
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpkMfXelwGuFLD6clmbCUhaiqPCHxT7ErKEw&usqp=CAU"}
                    alt={`${username} profile pic`}
                    />
                    <p className="font-bold">{username}</p>
                    <p>{fullName}</p>
                </Link>
            </div>
        </div>
    )
}