import React from "react"
import ReactDOM from "react-dom"

export default function PopUp({open,children,close}){
    if(!open) return null
    return ReactDOM.createPortal(
        <div className="popup">
            <div className="center bg-white inline-block"> 
                
                {children}
            </div>
        </div>,
        document.getElementById("popup")
    )
}