import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {plus,minus,reset} from '../actions'
import { Link  } from "react-router-dom";

const Counter = () => {
  const dispatch =  useDispatch()
  const count = useSelector(state=>state)
    return (
        <div>
            <h1>Counter : {count}</h1>
            <button onClick={()=>dispatch(plus(10))}>Plus</button>
            <button onClick={()=>dispatch(minus(5))}>Minus</button>
            <button onClick={()=>dispatch(reset())}>Reset</button>
            <br/>
            <Link to="/signup">Go TO lOGIN PAGE</Link>
        </div>
    
    );
};

export default Counter;