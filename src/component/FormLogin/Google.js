import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import './Form.css';




if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }

const Google = () => {
    const [user,setUser] = useState({
        isSignedIn : false,
        name : '',
        email : '',
        photo : ''
    })
    var provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleIn = () =>{
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email,photoURL} = result.user;
    const newUser = {...user}
    newUser.isSignedIn = true
    newUser.name = displayName;
    newUser.email = email;
    newUser.photo = photoURL
    setUser(newUser)
  }).catch((error) => {
    
  });
    }
    const handleGoogleOut = () => {
        firebase.auth().signOut().then(() => {
            const newUser = {...user}
            newUser.isSignedIn = false
            newUser.name = ''
            newUser.email = ''
            newUser.photo = ''
            setUser(newUser)
            console.log(newUser)
          }).catch((error) => {
            // An error happened.
          });
    }
        

    return (
        <div>{
            user.isSignedIn ? <button className="btn" onClick={handleGoogleOut}>Logout</button> : <button className="btn" onClick={handleGoogleIn}>Login with Google</button>
            }
           {
               user.isSignedIn &&  <div><h3>{user.name}</h3>
                <p>{user.email}</p>
                <img src={user.photo} alt=""/>
               </div>
           } 
        </div>
    );
};

export default Google;