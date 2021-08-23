import React, {useState, useContext} from "react"
import { FirebaseContext } from "../../context/Firebase"
import { userContext } from "../../context/userContext"

export default function AddComment({docId, comments, setComments, commentInput}){
    const [comment, setComment] = useState('')
    const {firebase , FieldValue} = useContext(FirebaseContext)
    const { user : {displayName} } = useContext(userContext)

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        
        setComments([{ displayName, comment}, ...comments])
        setComment('')

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName, comment})
            })
    }

    const handleChange = ({ target }) => {
        setComment(target.value)
    }

    return (
        <div className="border-t p-1">
            <form 
            className="flex w-full justify-between border-gray"
            onSubmit={e => comment.length > 1 ? handleSubmitComment(e) : e.preventDefault()} 
            method="POST"
            >
                <input 
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray w-full mr-3 py-5 px-4 focus:outline-none"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleChange}
                    ref={commentInput}
                ></input>
                <button 
                className={`text-sm font-bold mr-2 text-blue-500 focus:outline-none ${!comment && 'opacity-25'}`}
                type="button"
                onClick={handleSubmitComment}
                disabled={comment.length < 1}
                >
                    Post
                </button>
            </form>
        </div>
    
    )
}