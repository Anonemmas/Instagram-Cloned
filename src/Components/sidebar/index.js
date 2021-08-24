import React from "react"
import useUser from "../../hooks/use-User"
import User from "./user"
import Suggestions from "./suggestions"
import Footer from "../footer"

export default function Sidebar(){
    
    const {user: { userId, username, fullname} = {}} = useUser()

    return (
        <div className="side-bar  flex flex-col w-full p-4 pb-16 md:p-0 md:pl-4">
            <div style={{top:"5rem"}} className="sticky top-0.5">
                <User username={username} fullName={fullname}/>
                <Suggestions userId={userId} />
                <Footer />
            </div>
            
        </div>
    )
}