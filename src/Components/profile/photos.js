import React from "react"
import Skeleton from "react-loading-skeleton"

// future task: add onhover with the comments length & add the likes
// future future task: add a lightbox where you can add comments!


export default function Photos({photos}){
    console.log(photos)
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
                            <div id="photo" key={photo.docId} className="relative group">
                                <img className="h-full object-cover" src={photo.imageSrc} alt={photo.caption} />
                            </div>
                        ))
                    ) : null
                }
            </div>

            {!photos || (photos && photos.length === 0 && <p className="text-center text-2xl">No Photos Yet</p>)}

        </div>
        
    )
}