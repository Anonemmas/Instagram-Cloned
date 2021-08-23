import React from "react"

export default function Image({ src, caption}){
    return (
        <div className="post post__img">
            <img src={src} alt={caption}/>
        </div>
    )
}