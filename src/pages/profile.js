import React, {useState, useEffect} from "react"
import { useParams, useHistory } from "react-router"
import Header from "../Components/header"
import UserProfile from "../Components/profile"
import * as ROUTES from "../constants/routes"
import {getUserByUsername} from "../services/Firebase"
import Footer from "../Components/footer"

export default function Profile(){
    const {username} = useParams()
    const [userExists, setUserExists] = useState(undefined)
    const history = useHistory()

    useEffect(()=> {
        document.title= `${username}`

      async function checkUserExistsToLoadProfile(){
          const doesUserExist = await getUserByUsername(username)
          if(!doesUserExist){
              history.push(ROUTES.NOT_FOUND)
          }
          else{
              setUserExists(true)
          }
      }   
      checkUserExistsToLoadProfile()
    }, [username, history])

    return userExists ? (
        <div className="bg-gray ">
            <Header />
            <div className="mx-auto max-w-screen-lg pt-16 h-full md:w-9/12 mx-auto">
                <UserProfile username={username} />
                <Footer />
            </div>
        </div>
    ) : null;
}