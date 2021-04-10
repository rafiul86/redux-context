import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link  } from "react-router-dom";
import firebaseConfig from '../firebase.config';
import './Form.css'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }
const SignIn = () => {
    const [userInfo , setUserInfo] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
        
    })
    const handleBlurForm = (e) =>{
        let validAuth = true
        if(e.target.name === 'email'){
            const validEmail = /\S+@\S+\.\S+/.test(e.target.value)
            validAuth = validEmail;
            console.log(validEmail)
        }
        if(e.target.name === 'password'){
            const checkPass = /\d/.test(e.target.value)
            const checkLength = e.target.value.length > 3 ;
            validAuth = checkPass && checkLength 
            console.log(validAuth)
        }
        if(validAuth){
            console.log(validAuth)
            const newUserInfo = {...userInfo}
            newUserInfo[e.target.name] = e.target.value ;
            setUserInfo(newUserInfo)
            console.log(newUserInfo)
        }
    }

    const handleSubmitForm = (e) =>{
        console.log(e.target.value)
        if(userInfo.email && userInfo.password){
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
  .then((userCredential) => {
    const newUserInfo = {...userInfo}
    newUserInfo.success = true
    newUserInfo.error =''
    setUserInfo(newUserInfo)
    console.log(newUserInfo)
  })
  .catch((error) => {
    const newUserInfo = {...userInfo}
    newUserInfo.error = error.message;
    newUserInfo.success = false
    setUserInfo(newUserInfo)
    console.log(error)
  });
        }
        e.preventDefault()
    }
    return (
             <div>
                 <h3>Don't have an account ? <Link to="/signup">Signup here</Link> </h3> 
                 <form onSubmit={handleSubmitForm} >
                <input className="input" type="email" name="email" onBlur={handleBlurForm} placeholder="Email" required/>
                <br/>
                <br/>
                <input className="input" type="password" name="password" onBlur={handleBlurForm} placeholder="password" required/>
                <br/>
                <input type="submit"/>
                <h3 style={{color : 'red'}}>{userInfo.error}</h3>
                {
                    userInfo.success && <h3 style={{color : 'green'}}>Logged in successfully !!</h3>
                }
            </form>
        </div>
    );
};



export default SignIn;





 