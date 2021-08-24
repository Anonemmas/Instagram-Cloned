import React, { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "../constants/routes"
import { FirebaseContext } from "../context/Firebase"
import Drizzy from "../images/Drizzy.jpg"
import { userContext } from "../context/userContext"
import Search from "./search"
import SearchIcon from '@material-ui/icons/Search'

export default function Header(props){
    const {firebase} = useContext(FirebaseContext)
    const {user} = useContext(userContext)
    // console.log(user.displayName)
    const searchRef = useRef(null)

    const handleFocus = () => {
        searchRef.current.focus()
    }
    
    return (
        <div className="header h-16 border-b bg-white fixed w-full top-0 z-10">
            <div className="header-container h-full flex justify-between items-center md:w-9/12 mx-auto">
                <div className="flex justify-center">
                    <Link className="h-10 ml-1 md:ml-0" to={ROUTES.DASHBOARD}>
                        <img 
                        src="https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk.png"
                        alt=""
                        className="h-full"
                        />
                    </Link>
                </div>
                <Search searchRef={searchRef}/>
                {user ? (
                    <div className="flex justify-around items-center md:w-1/6 fixed md:relative bottom-0 left-0 w-screen bg-white
                    h-12 md:h-8">
                        <Link to={ROUTES.DASHBOARD}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                            />
                            </svg>
                        </Link>
                        <button 
                            className="md:hidden"
                            onClick={handleFocus}
                        >
                            <SearchIcon />
                        </button>
                        <Link 
                        onClick = {() => (
                            firebase.auth().signOut()
                            .then(() => console.log("Logged Out"))
                            )}
                        className="justify-self-end" 
                        to={ROUTES.LOGIN}
                        >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                />
                                </svg>
                        </Link>
                        <Link to={`/p/${user.displayName}`} className="h-6">
                            <img 
                                className="rounded-full h-full"
                                src={Drizzy}
                                alt="Drizzy-pic"
                            />
                        </Link>
                    </div>
                ):(
                    <div>
                        <Link className="Login justify-self-end border bg-blue-500 px-3 py-1 rounded mr-3 text-white" to={ROUTES.LOGIN}>Login</Link>
                        <Link className="justify-self-end text-blue-600" to={ROUTES.SIGN_UP}>Sign up</Link>
                    </div>
                )}
            </div>
        </div>
    )
}