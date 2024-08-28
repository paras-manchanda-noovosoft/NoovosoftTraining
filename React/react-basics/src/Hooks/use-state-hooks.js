import React, {useState} from "react";

const Counter = () => {
    let [count,setcount]=useState(0);
    function increment(){
        setcount(++count);
    }
    return (
        <>
            <button className={'btn'} onClick={increment}>Increment the number</button>
            <h1 style={{textAlign:'center'}}>{count}</h1>
            </>
    );
};

export default Counter;