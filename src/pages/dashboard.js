import React, {useEffect} from "react"
import Header from "../Components/header"
import Sidebar from "../Components/sidebar"
import Timeline from "../Components/timeline"

export default function Dashboard(){

    useEffect(()=> {
        document.title = "Home · Instagram"
    }, [])
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="dashboard-body h-full md:w-9/12 mx-auto md:grid md:gap-4 md:mt-4 pt-16">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}