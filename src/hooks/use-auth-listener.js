//This is for listening for changes when user logged in or out

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/Firebase";

export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }
            else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        });
        return () => listener();
    }, [firebase])

    return {user}
}