import React from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import './Login.css'
import { useStateValue } from '../../store/UserProvider'
import { actionTypes } from '../../store/reducer'

//rafce snippet shorthand
const Login = () => {

    const [{ }, dispatch] = useStateValue()



    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result)
                // const token = credential.accessToken
                //This gives you access to the user's google data
                // const user = result.user
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => {
                // const errCode = error.code
                const errMessage = error.message
                console.log(errMessage)
                // The email of the user's account used.
                // const email = error.email
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login__text">
                    <h1>ChatterApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login