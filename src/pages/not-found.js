import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../Components/header"
import * as ROUTES from "../constants/routes"


export default function NotFound(){

    useEffect(() => {
        document.title = "Page Not Found · Instagram"
    },[])
    return (
        <div className="not-found-container">
            <Header />
            <div className="h-full w-9/12 mx-auto text-center mt-8 pt-16">
                <h2 className="mb-3 font-semibold text-2xl text-current">Sorry this page isn't available</h2>
                <p className="inline-block">The link you followed may be broken, or the page may have been removed.</p> {` `}
                <Link className="text-blue-500" to="/">Go back to Instagram.</Link>
            </div>
        </div>
    )
}