import React, {useState} from "react"
import { Link } from "react-router-dom"
import {formatDistance} from "date-fns"
import AddComment from "./add-comment"

export default function Comments({docId, comments: allComments, posted, commentInput}){
    const [comments, setComments] = useState(allComments)
    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments.length >= 3 && (
                    <p className="text-sm text-gray-500 mb-1 cursor-pointer">
                        View all {comments.length} comments
                    </p>
                )}
                {comments.slice(0, 3).map(item => (
                    item.displayName ? 
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">
                                {item.displayName}
                            </span>
                            <span>{item.comment}</span>
                        </Link>
                    </p>
                    :null
                ))}
                <p className="text-gray-500 uppercase text-xs mt-2">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            <AddComment 
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )
}