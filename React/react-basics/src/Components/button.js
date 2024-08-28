import React from 'react';
import {useState} from 'react';

export const Demo=()=>{
    return <h1>demo called</h1>;
}

const Button = () => {
    let [count,setcount]=useState(0);
    function increment(){
        console.log("hello");
        setcount(++count);
    }
    return (
        <>
        <button onClick={increment}>This is a button</button>
        <h1>{count}</h1>
        </>
    );
};

export default Button;
