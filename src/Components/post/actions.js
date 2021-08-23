import React, {useState, useContext}  from "react";
import { FirebaseContext } from "../../context/Firebase";
import { userContext } from "../../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faComment} from "@fortawesome/free-solid-svg-icons";

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }){
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {user : {uid: userId = ''}} = useContext(userContext)
    const Heart = <FontAwesomeIcon style={{height: "1.3rem", width: "100%"}} icon={faHeart} />
    const Comment = <FontAwesomeIcon style={{height: "1.3rem", width: "100%"}} icon={faComment} />
    
    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);
        
        await firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });
        
        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    }

    return (
        <>
            <div className="flex justify-between p-4">
                <div className="flex">
                    <button
                        onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleToggleLiked((toggleLiked) => !toggleLiked);
                            }
                        }}
                        className={`mr-4 flex items-center justify-center select-none cursor-pointer active:outline-none focus:outline-none ${
                            toggleLiked ? 'fill-current text-red-600' : 'text-gray-400'
                        }`}
                        >
                            {Heart}
                    </button>
                    <button
                        onClick={handleFocus}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFocus();
                            }
                        }}
                        className={"flex items-center justify-center select-none cursor-pointer active:outline-none focus:outline-none text-gray-600"}
                        >
                            {Comment}
                    </button>
                </div>
            </div>
            <div className="p-4 py-0">
                <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </>
    )
}