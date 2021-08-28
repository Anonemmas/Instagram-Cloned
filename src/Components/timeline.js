import React, { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import Post from "./post"
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos"
import { userContext } from "../context/userContext"
import { getUserByUserId } from "../services/Firebase"

export default function Timeline(props){
    const {user:{uid: userId = ''}} = useContext(userContext)
    const {photos} = useFollowedUsersPhotos()
    const [hasFollowing, setHasFollowing] = useState(true)
    // console.log(user)

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
    
    console.log(hasFollowing)
    
    return(
        <div className="TimeLine w-full overflow-hidden">
            {!hasFollowing ? (
                <p className="text-center text-2xl">Follow people to see photos!</p>
            ) : !photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton className="mb-5" key={index} count={1} width={640} height={500} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) :  <p className="text-center text-2xl">The people you follow have no Photos yet!</p>}
        </div>
    )
}