import React, { useState } from 'react';

const Form = () => {
    const [user , setUser] = useState({
        isSignedIn : false ,
        name : '',
        email : '',
        password : ''
    })
    const handleBlur = (e) =>{
        let validAuth = true
        if(e.target.name === 'email'){
            const validEmail = /\S+@\S+\.\S+/.test(e.target.value)
            validAuth = validEmail;
        }
        if(e.target.name === 'password'){
            const checkPass = /\d/.test(e.target.value)
            const checkLength = e.target.value.length > 5 ;
            validAuth = checkPass && checkLength 
        }
        if(validAuth){
            const newUser = {...user}
            newUser[e.target.name] = e.target.value ;
            setUser(newUser)
        }
    }

    const handleSubmit = () =>{
        
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <h1>{user.password}</h1>
            <h1>{user.email}</h1>
            <form action="submit" onSubmit={handleSubmit}>
                 <input name="name" onBlur={handleBlur} type="text"/>
                <br/>
                <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
                <br/>
                <input type="submit"/>

            </form>
        </div>
    );
};

export default Form;