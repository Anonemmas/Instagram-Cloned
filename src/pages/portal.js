import React, {useEffect, useState} from "react"
import Portal from "../Components/portal"
import Header from "../Components/header"
import { useParams, useHistory } from "react-router-dom"
import {getPostByPostId} from "../services/Firebase"
import * as ROUTES from "../constants/routes"

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
        }
        checkPostExitsToLoadPost()
    }, [photoId, history])

    // console.log(photo)
    
    return (
        <>
            <Header />
            <div className="PortalPage pt-16">
                <Portal photo={photo}/>
            </div>
        </>
    )
}