import React from "react"
import AppStore from "../images/AppStore.png"
import PlayStore from "../images/PlayStore.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

function GetApp(props){
    return (
        <div className="get-the-app">
            <p>Get the app.</p>
            <div className="store-buttons">
                <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en&gl=US"><img src={PlayStore} alt=""/></a>
                <a target="_blank" rel="noreferrer" href="https://apps.apple.com/us/app/instagram/id389801252"><img src={AppStore} alt=""/></a>
            </div>
        </div>
    )
}

function LoginWithFacebook(props){
    const facebook = <FontAwesomeIcon icon={faFacebookSquare} />
    return (
        <a style={props.style} id="to-facebook" target="_blank" rel="noreferrer" href="jsx.com">{facebook} <span style={{marginLeft: "2px"}}>Login with Facebook</span></a>
    )
}

function Form(props){
    return (
            <form method={props.method} onSubmit={props.onSubmit}>
                <img 
                src="https://hd-report.com/wp-content/uploads/2016/02/instagram_text_logo_blk.png"
                alt=""
                />
                {props.children}
            </form>
    )
}

export {Form, GetApp, LoginWithFacebook}