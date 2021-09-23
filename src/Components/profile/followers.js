import React from "react"
import PopUp from "../popup"
import CloseIcon from '@material-ui/icons/Close';

export default function FollowersPopUp({open, close}){
    return (
        <PopUp open={open} close={close}>
            <button className="close" onClick={close}>
                    <CloseIcon />
                </button>
            This is going to be the followers PopUp.
        </PopUp>
    )
}