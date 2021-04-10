import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link  } from "react-router-dom";
import './Form.css'
import Google from './Google';
import firebaseConfig from '../firebase.config';
import Facebook from './Facebook';


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

    const handleLink = () =>{
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
            console.log("Email sent to the ....", user.email) 
        }).catch(function(error) {
          console.log(error)
        });
    }
    const handleshow = ()=>{
        var googleUser = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        
        if (googleUser != null) {
          name = googleUser.displayName;
          email = googleUser.email;
          photoUrl = googleUser.photoURL;
          emailVerified = googleUser.emailVerified;
          uid = googleUser.uid;  
          console.log(googleUser)
        }
    }
    return (
             <div>
                 <h3>Already have an account ? <Link to="/sign">Sign in here</Link> </h3> 
                 <form onSubmit={handleSubmit} >
                 <input className="input" name="name" onBlur={handleBlur} placeholder="name" type="text" required/>
                <br/>
                <input className="input" name="address" onBlur={handleBlur} placeholder="address line 1" type="text" required/>
                <br/>
                <input className="input" name="address" onBlur={handleBlur} placeholder="address line 2 (optional)" type="text" />
                <br/>
                <input className="input" name="zip" onBlur={handleBlur} placeholder="zip code" type="number" required/>
                <br/>
                <input className="input" name="phone" onBlur={handleBlur} placeholder="phone" type="text" required/>
                <br/>
                <input className="input" type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                <br/>
                <input className="input" type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
                <br/>
                <input className="submit"  type="submit"/>
                <h3 style={{color : 'red'}}>{user.error}</h3>
                {
                    user.success && <h3 style={{color : 'green'}}>New user created successfully !!</h3>
                }
            </form>
           <Google></Google>
           <Facebook></Facebook>
           <button onClick={handleLink}>Send Link</button>
           <button onClick={handleshow}>Show user info</button>
        </div>
    );
};

export default Form;