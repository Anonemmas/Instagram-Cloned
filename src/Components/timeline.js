import React from "react"
import Skeleton from "react-loading-skeleton"
import Post from "./post"
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos"

export default function Timeline(props){
    const {photos} = useFollowedUsersPhotos()
    // console.log(photos)
    return(
        <div className="TimeLine w-full">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton className="mb-5" key={index} count={1} width={640} height={500} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : (
                <p className="text-center text-2xl">Follow people to see photos!</p>
            )}
        </div>
    )
}