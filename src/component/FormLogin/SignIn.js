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
        }
        if(e.target.name === 'password'){
            const checkPass = /\d/.test(e.target.value)
            const checkLength = e.target.value.length > 3 ;
            validAuth = checkPass && checkLength 
        }
        if(validAuth){
            const newUserInfo = {...userInfo}
            newUserInfo[e.target.name] = e.target.value ;
            setUserInfo(newUserInfo)
        }
    }

    const handleSubmitForm = (e) =>{
        if(userInfo.email && userInfo.password){
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
  .then((userCredential) => {
    const newUserInfo = {...userInfo}
    newUserInfo.success = true
    newUserInfo.error =''
    setUserInfo(newUserInfo)
  })
  .catch((error) => {
    const newUserInfo = {...userInfo}
    newUserInfo.error = error.message;
    newUserInfo.success = false
    setUserInfo(newUserInfo)
  });
        }
        e.preventDefault()
    }
    const handleReset = () =>{
        var auth = firebase.auth();
var emailAddress = "rafiulhasan86@gmail.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
  console.log('email sent')
}).catch(function(error) {
    console.log(error)
});
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
                <input className="submit-b" type="submit"/>
                <h3 style={{color : 'red'}}>{userInfo.error}</h3>
                {
                    userInfo.success && <h3 style={{color : 'green'}}>Logged in successfully !!</h3>
                }
            </form>
            <button onClick={handleReset}>Forgot Password/Reset</button>
        </div>
    );
};



export default SignIn;





 