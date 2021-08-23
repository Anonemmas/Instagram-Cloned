import React from "react"
import useAuthListener from "../hooks/use-auth-listener"
const userContext = React.createContext()

function UserContextProvider(props){
    const {user} = useAuthListener()
    return (
        <userContext.Provider value={{user}}>
            {props.children}
        </userContext.Provider>
    )
}

export {UserContextProvider, userContext}