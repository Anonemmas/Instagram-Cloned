import React from "react"
import {Link} from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faComment} from "@fortawesome/free-solid-svg-icons";

// future task: add onhover with the comments length & add the likes
// future future task: add a lightbox where you can add comments!


export default function Photos({photos}){
    const Heart = <FontAwesomeIcon style={{height: "1.5rem", width: "100%"}} icon={faHeart} />
    const Comment = <FontAwesomeIcon style={{height: "1.5rem", width: "100%"}} icon={faComment} />

    return (
        <div className="border-t border-gray mt-12 pt-4">
            <div className="grid grid-cols-3 gap-1 md:gap-8 mt-4 mb-12">
                {!photos ? (
                        <>
                            {[...new Array(9)].map((_, index) => (
                                <Skeleton key={index} count={1} width={320} height={300} />
                            ))}
                        </>
                    ) : photos && photos.length > 0 ? (
                        photos.map(photo => (
                            <Link  key={photo.docId} to={`/posts/${photo.photoId}`}>
                                <div id="photo" className="relative group">
                                    <img className="h-full object-cover" src={photo.imageSrc} alt={photo.caption} />
                                    <div className="likes h-full w-full flex items-center justify-center">
                                        <div className="w-3/6 flex justify-around">
                                            <div className="heart flex items-center">
                                                {Heart}
                                                <span className="ml-2">{photo.likes.length}</span>
                                            </div>
                                            <div className="heart flex items-center">
                                                {Comment}
                                                <span className="ml-2">{photo.comments.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : null
                }
            </div>

            {!photos || (photos && photos.length === 0 && <p className="text-center text-2xl">No Photos Yet</p>)}

        </div>
        
    )
}