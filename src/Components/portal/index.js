import React, {useEffect, useRef, useState, useContext } from "react"
import { userContext } from "../../context/userContext"
import Header from "./Header"
import Photo from "./Photo"
import Actions from "../post/actions"
import Comments from "../post/comments"
import Footer from "../post/footer"

export default function Portal({photo}){
    const [userLikedPhoto, setUserLikedPhoto] = useState(null)
    const {user : {uid: userId = ''}} = useContext(userContext)
    const commentInput = useRef()

    const handleFocus = () => commentInput.current.focus()

    useEffect(() => {
        function doesUserLikePhoto() {
            if(photo.likes.includes(userId)){
                setUserLikedPhoto(true)
            }
            else{
                setUserLikedPhoto(false)
            }
        }
        doesUserLikePhoto()
    })

    return (
        <div className="portal">
            <div className="w-full">
                <Header photo={photo}/>
                <Photo photo={photo}/>
                {userLikedPhoto !== null ? (
                    <Actions 
                        docId={photo.docId}
                        totalLikes={photo.likes.length}
                        likedPhoto={userLikedPhoto}
                        handleFocus={handleFocus}
                    />
                ): null}
                <Footer username={photo.username} caption={photo.caption}/>
                <Comments 
                    docId={photo.docId}
                    comments={photo.comments}
                    posted={photo.dateCreated}
                    commentInput={commentInput}
                />

            </div>
        </div>
    )
}