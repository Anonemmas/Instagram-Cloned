import React, { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import Post from "./post"
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos"
import { userContext } from "../context/userContext"
import { getUserByUserId } from "../services/Firebase"
import {Link} from "react-router-dom"

export default function Timeline(props){
    const {user:{uid: userId = ''}} = useContext(userContext)
    const {photos} = useFollowedUsersPhotos()
    const [hasFollowing, setHasFollowing] = useState(true)
    

    useEffect(() => {
        async function isUserFollowingAny(){
            const [{following}] = await getUserByUserId(userId)
            // console.log(following.length)
            if(following.length > 0){
                setHasFollowing(true)
            }
            else {
                setHasFollowing(false)
            }
        }
        
        isUserFollowingAny()
 
    })

    return(
        <div className="TimeLine w-full overflow-hidden">
            {!hasFollowing ? (
                <>
                    <p className="text-center text-2xl py-8">Follow people to see photos!</p>
                    <Link to={`/p/raphael`}>
                        <span className="text-center w-100">(Follow raphael to see pictures)</span>
                    </Link>
                </>
                
            ) : !photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton className="mb-5" key={index} count={1} width={640} height={500} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) :  <>
                    <p className="text-center text-2xl py-8 px-4">
                        The people you follow have no Photos yet!
                    </p>
                    <Link to={`/p/raphael`}>
                        <span className="text-center w-100">(Follow raphael to see pictures)</span>
                    </Link>
            
            </>}
        </div>
    )
}