import React, { useReducer,useEffect } from "react"
import { getUserByUsername, getUserPhotosByUsername } from "../../services/Firebase"
import Header from "./header"
import Photos from "./photos"

const reducer = (state, newState) => ({...state, ...newState})
const initialState = {
    profile: {},
    photosCollection: null,
    followerCount:0,
    followers:[],
    following:[]
}

export default function UserProfile({username}){

    const[{profile, photosCollection, followerCount, followers, following}, dispatch] = useReducer(
        reducer,
        initialState
    )

    useEffect(() => {
        async function getProfileInfoAndPhotos(){
            const [{...user}] = await getUserByUsername(username)
            const photos = await getUserPhotosByUsername(username);
             
            dispatch({ profile: user, photosCollection:photos, followerCount:user.followers.length, followers:user.followers, following: user.following })
        }
        getProfileInfoAndPhotos()
        
    }, [username])
    
    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                username={username}
                followerCount={followerCount}
                setFollowerCount={dispatch}
                followers={followers}
                following={following}
            />
            <Photos photos={photosCollection}/>
        </>
    )
}