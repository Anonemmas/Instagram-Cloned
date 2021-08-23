import React from "react"
import {Link} from "react-router-dom"
import Drizzy from "../../images/Drizzy.jpg"

const User = ({username, fullName}) => (
       (
        <Link className="grid grid-cols-4 gap-4 mb-4 items-center sticky top-0.5" to={`/p/${username}`}>
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={Drizzy}
                    alt="My profile"
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm text-gray-600">{fullName}</p>
            </div>
        </Link>
    ) 
)


export default User