import React, {useEffect, useRef, useState, useContext } from "react"
import { userContext } from "../../context/userContext"
import Header from "./Header"
import Photo from "./Photo"
import Actions from "../post/actions"
import Comments from "../post/comments"
import Footer from "../post/footer"
import { getUserByUserId } from "../../services/Firebase"
import Skeleton from "react-loading-skeleton"

export default function Portal({photo}){
    const [username, setUsername] = useState(null)
    const [userLikedPhoto, setUserLikedPhoto] = useState(null)
    const {user : {uid: userId = ''}} = useContext(userContext)
    const commentInput = useRef()

    const handleFocus = () => commentInput.current.focus()

    useEffect(() => {
        async function getUsername(){
            const [{username = ''}] = await getUserByUserId(photo.userId)
                setUsername(username)
        }
        getUsername()
    })

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
        <>
            <div className="portal md:hidden mb-12">
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
                    {username ? (
                    <Footer username={username} caption={photo.caption}/>
                    ) : <Skeleton style={{marginLeft: "1rem"}} count={1} width={300} height={20}/>}
                    <Comments 
                        docId={photo.docId}
                        comments={photo.comments}
                        posted={photo.dateCreated}
                        commentInput={commentInput}
                    />
                </div>
            </div>

            <div style={{minHeight: '90vh'}} className="portal hidden md:block mt-8 mx-auto">
                <div className="w-9/12 m-auto grid grid-cols-6">
                    <div className="col-span-4">
                        <Photo photo={photo}/>
                    </div>
                    <div className="col-span-2 border ml-4">
                        <Header photo={photo}/>
                        {username ? (
                        <Footer username={username} caption={photo.caption}/>
                        ) : <Skeleton style={{marginLeft: "1rem"}} count={1} width={200} height={20}/>}
                        {userLikedPhoto !== null ? (
                        <Actions 
                            docId={photo.docId}
                            totalLikes={photo.likes.length}
                            likedPhoto={userLikedPhoto}
                            handleFocus={handleFocus}
                        />
                        ): null}
                        <Comments 
                            docId={photo.docId}
                            comments={photo.comments}
                            posted={photo.dateCreated}
                            commentInput={commentInput}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}