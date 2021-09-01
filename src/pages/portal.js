import React, {useEffect, useState} from "react"
import Portal from "../Components/portal"
import Header from "../Components/header"
import { useParams, useHistory } from "react-router-dom"
import {getPostByPostId} from "../services/Firebase"
import * as ROUTES from "../constants/routes"
import Skeleton from "react-loading-skeleton"

export default function PortalPage(){
    const [photo, setPhoto] = useState({})
    const [postExists, setPostExists] = useState(null)
    const {photoId} = useParams()
    const history = useHistory()

    useEffect(() => {
        document.title = `${photoId}`
        async function checkPostExitsToLoadPost(){
            const doesPostExist = await getPostByPostId(photoId)
            if(!doesPostExist.length){
                history.push(ROUTES.NOT_FOUND)
            }
            else {
                setPostExists(true)
                const {...photo} = await getPostByPostId(photoId)
                setPhoto(photo[0])
            }
            // const user = await getUserByUserId(photo.userId)
            // setUsername(user[0].username)
            
        }
        checkPostExitsToLoadPost()
        
    }, [photoId, history, photo.userId])

    

    return (
        <>
            <Header />
            <div className="PortalPage pt-16">
                {photo && photo.docId && postExists ?
                <Portal photo={photo}/> : (
                <>
                <Skeleton count={1} width="100%" height="100vh"/>
                </>
                )}
            </div>
        </>
    )
}