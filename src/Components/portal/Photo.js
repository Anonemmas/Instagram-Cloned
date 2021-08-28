import React from "react"

export default function Photo({photo}){
    
    return (
        <div style={{height: "300px"}} className="singlePhoto h-60 w-full">
            <img className="h-full object-cover" src={photo.imageSrc} alt={photo.caption}/>
        </div>
    )
}