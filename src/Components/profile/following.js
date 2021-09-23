import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import PopUp from "../popup"
import CloseIcon from '@material-ui/icons/Close';
import { getUserByUserId } from "../../services/Firebase";

export default function FollowingPopUp({open, close, following}){

    // const getUsername = async(user) => {
    //     const [{username}] = await getUserByUserId(user)
    //     console.log(username)
    //     if(username){
    //     return username
    // }
    // }


    return (
        <PopUp open={open} close={close}>
            <div className="followingPopup relative">
                <button className="close" onClick={close}>
                    <CloseIcon />
                </button>
                <h3 className="text-center border-b p-4">Following</h3>
                <div>
                    {/* {following.map(profile => {
                        const user = getUsername(profile)
                        return (
                            <Link>{user[0]}</Link>
                        )
                    })} */}
                </div>
            </div>
        </PopUp>
    )
}