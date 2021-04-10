import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { Link  } from "react-router-dom";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }
const Form = () => {
    const [user , setUser] = useState({
        name : '',
        email : '',
        password : '',
        error : '',
        success : false
        
    })
    const handleBlur = (e) =>{
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
            const newUser = {...user}
            newUser[e.target.name] = e.target.value ;
            setUser(newUser)
        }
    }

    const handleSubmit = (e) =>{
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    const newUser = {...user}
    newUser.success = true
    newUser.error =''
    setUser(newUser)
  })
  .catch((error) => {
    const newUser = {...user}
    newUser.error = error.message;
    newUser.success = false
    setUser(newUser)
  });
        }
        e.preventDefault()
    }
    return (
             <div>
                 <h3>Already have an account ? <Link to="/sign">Sign in here</Link> </h3> 
                 <form onSubmit={handleSubmit} >
                 <input name="name" onBlur={handleBlur} placeholder="name" type="text" required/>
                <br/>
                <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
                <br/>
                <input type="submit"/>
                <h3 style={{color : 'red'}}>{user.error}</h3>
                {
                    user.success && <h3 style={{color : 'green'}}>New user created successfully !!</h3>
                }
            </form>
        </div>
    );
};

export default Form;