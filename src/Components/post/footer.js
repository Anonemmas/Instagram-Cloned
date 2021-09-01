import React, {useState} from "react"

export default function Footer({username, caption}){
    const [on,setOn] = useState(false)  

    const truncate = (input) => {
        if (input.length > 43) {
           return input.substring(0, 43);
        }
        return input;
     };

     const ToggleTextLength = () => {
        setOn(prevOn => !prevOn)
     }

    return (
        <div style={{maxHeight: "56px", overflow: "auto"}} className="p-4 pt-2 pb-0">
            <span className="mr-1 font-bold">{username}</span>
            {caption.length > 43 ? (
                <>
                    <span>{!on ? truncate(caption) : caption}</span>
                    <button onClick={ToggleTextLength} className="focus:outline-none ml-1 text-blue-600">
                        {on ? "... see less" : "... see more"}
                    </button>
                </>
            ): <span>{caption}</span>}         
        </div>
    )
}