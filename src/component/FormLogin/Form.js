import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';



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
            console.log(validAuth)
            const newUser = {...user}
            newUser[e.target.name] = e.target.value ;
            setUser(newUser)
            console.log(newUser)
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
    console.log(error.message)
  });
        }
        e.preventDefault()
    }
    return (
             <div>
                 <form onSubmit={handleSubmit} >
                 <input name="name" onBlur={handleBlur} type="text"/>
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