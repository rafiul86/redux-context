import React, { useState } from 'react';
import firebaseConfig from '../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";



const Reset = () => {
    const [state,setState] = useState('')
    const handleReset = ()=>{
     const emailAddress = document.getElementById('mail').value 
     console.log(emailAddress)
     var auth = firebase.auth();
auth.sendPasswordResetEmail(emailAddress).then(function() {
  alert("Verification mail sent")
  
}).catch(function(error) {
  console.log(error)
  setState(error)
});
    }
    return (
        <div>
                <input type="text" name="email" id="mail"/>
                <button onClick={handleReset}>Submit</button>
                <p>{state.message}</p>
        </div>
    );
};

export default Reset;
