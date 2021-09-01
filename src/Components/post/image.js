import React from "react"

export default function Image({ src, caption}){
    return (
        <div className="post post__img">
            <img className="h-full w-full" src={src} alt={caption}/>
        </div>
    )
}