import React, {useEffect, useState, useContext} from "react"
import {Link, useHistory} from "react-router-dom"
import iPhone from "../images/iphone-instagram.png"
import * as ROUTES from "../constants/routes"
import {FirebaseContext} from "../context/Firebase"
import {Form, GetApp,LoginWithFacebook} from "../reusable_components/form"
import Footer from "../Components/footer"


export default function Login(){

    const [user, setUser] = useState({email: "", password: ""})
    const [showPassword, setShowPassword] = useState(false)
    const [isInvalid, setIsInvalid] = useState(true)
    const [error, setError] = useState("")
    const {firebase} = useContext(FirebaseContext)
    const history = useHistory()

    useEffect(() => {
        document.title = 'Login · Instagram'
    }, [])

    useEffect(()=> {
        setIsInvalid(user.email && user.password ? false : true)
    }, [user])

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser(prevUser => ({...prevUser, [name]:value}))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            history.push(ROUTES.DASHBOARD)
        }
        catch(error) {
            // setUser("")
            setError(error.message)
            console.log(error)
        }
    }

    const toggleShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)   
    }

    useEffect(() => {
        const passwordField = document.getElementById("password")
        if(showPassword){
            passwordField.type = "text"
        }
        else if(!showPassword){
            passwordField.type = "password"
        }
    }, [showPassword])

    console.log(showPassword)

    return (
        <div className="login bg-gray" style={{background: "#f7f7f7"}}>
        <div className="Login-Container">
            <div className="login-container-left hidden md:block">
                <div className="image-holder">
                    <img src={iPhone} alt=""/>
                </div>
            </div>
            <div className="login-container-right">
                <div className="form-holder">
                    <Form method="POST" onSubmit={handleLogin}>
                        <input 
                        type="email" 
                        name="email"
                        placeholder="Phone Number, Username or E-mail" 
                        value={user.email}
                        onChange={handleChange}
                        />
                        <div className="w-100 relative mt-2 mb-2">
                            <input 
                            id="password"
                            className="password w-100"
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={user.password}
                            onChange={handleChange}
                            />
                            <button 
                            className="show-button text-sm focus:outline-none"
                            style={{display: user.password ? "block" : "none"}}
                            onClick={toggleShowPassword}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {error && <p id="error">{error}</p>}
                        <button 
                        style={{background: isInvalid ? "rgba(0,149,246,.3)" : "rgba(0,149,246,.8)",cursor:isInvalid && "context-menu"}} 
                        disabled={isInvalid}
                        id="login"
                        >
                            Login
                        </button>
                    </Form>
                    <div className="or-section">
                        <div className="left-line"></div>
                        <div className="Or">OR</div>
                        <div className="right-line"></div>
                    </div>
                    <LoginWithFacebook />
                    <a id="forgot-password" target="_blank" rel="noreferrer" href="jsx.com">Forgot Password?</a>
                </div>
                <div className="no-account">
                    <p>Don't have an account?</p>
                    <Link to ={ROUTES.SIGN_UP}>Sign up</Link>
                </div>
                <GetApp />
            </div>
        </div>
        <Footer/>
        </div>
    )
}