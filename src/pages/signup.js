import React, { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import {Form,GetApp, LoginWithFacebook} from "../reusable_components/form"
import * as ROUTES from "../constants/routes"
import {FirebaseContext} from "../context/Firebase"
import {doesUsernameExist} from "../services/Firebase"
import Footer from "../Components/footer"

export default function SignUp(){
    const history = useHistory()
    const {firebase} = useContext(FirebaseContext)
    const [newUser, setNewUser] = useState({email:"",fullname: "", username:"", password:""})
    const [error, setError] = useState("")
    const isInvalid = !newUser.email || !newUser.fullname || !newUser.username || !newUser.password 

    useEffect(()=> {
        document.title = "Signup · Instagram"
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewUser(prev => ({...prev, [name]:value}))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError("")

        const doesUsernameExistResult = await doesUsernameExist(newUser.username);
        if (doesUsernameExistResult && doesUsernameExistResult.length === 0) {
            try{
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)

                await createdUserResult.user.updateProfile({
                    displayName: newUser.username
                })
                
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: newUser.username.toLocaleLowerCase(),
                    fullName:newUser.fullname,
                    emailAddress: newUser.email.toLocaleLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })

                history.push(ROUTES.DASHBOARD)
            }
            catch(error){
                setError(error.message)
            }
    }
        else {
            setError('That username is already taken, please try another.');
        }
    }

    return (
        <div className="sign-up-form">
            <div className="form-holder">
                <Form method="POST" onSubmit={handleSignUp}>
                    <p id="intro-signup">Sign up to see photos and videos from your friends.</p>
                    <button id="login" style={{marginBottom: 20}}>
                        <LoginWithFacebook style={{color: "#fff", margin: 0}}/>
                    </button>
                    <div className="or-section" style={{width: "100%" ,margin: "0 auto 10px auto"}}>
                        <div className="left-line"></div>
                        <div className="Or">OR</div>
                        <div className="right-line"></div>
                    </div>
                    <input 
                    type="email" 
                    name="email"
                    placeholder="E-mail" 
                    value={newUser.email.toLowerCase()}
                    onChange={handleChange}
                    />
                    <input 
                    className="mt-1"
                    type="fullname" 
                    name="fullname"
                    placeholder="Full Name" 
                    value={newUser.fullname}
                    onChange={handleChange}
                    />
                    <input 
                    className="mt-1"
                    type="username" 
                    name="username"
                    placeholder="Username" 
                    value={newUser.username.trim().toLocaleLowerCase()}
                    onChange={handleChange}
                    />
                    <input 
                    className="mt-1 mb-2"
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={newUser.password}
                    onChange={handleChange}
                    />
                    <button 
                    id="login"
                    style={{background: isInvalid ? "rgba(0,149,246,.3)" : "rgba(0,149,246,.8)",cursor:isInvalid && "context-menu"}} 
                    disabled={isInvalid}
                    >
                        Sign up
                    </button>
                </Form>
                {error && <p id="error">{error}</p>}
                <p id="agree-terms">By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
            </div>
            <div className="no-account">
                <p>Have an account?</p>
                <Link to ={ROUTES.LOGIN}>Log in</Link>
            </div>
            <GetApp />
            <Footer />
            
        </div>
    )
}