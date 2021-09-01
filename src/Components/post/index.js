import React, {useRef} from "react"
import Actions from "./actions"
// import AddComment from "./add-comment"
import Footer from "./footer"
import Header from "./header"
import Image from "./image"
import Comments from "./comments"

export default function Post({content}){
    
    const commentInput = useRef()

    const handleFocus = () => commentInput.current.focus()

    return (
        <div className="rounded col-span-4 border border-gray-100 md:mb-16 bg-white">
            <Header username={content.username}/>
            <Image src={content.imageSrc} caption={content.caption}/>
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer username={content.username} caption={content.caption}/>
            <Comments 
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    )
}