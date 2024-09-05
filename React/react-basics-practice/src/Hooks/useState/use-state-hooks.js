import React, {useState} from "react";

const Counter = () => {
    let [count,setCount]=useState(0);
    function increment(){
        setCount(++count);
    }
    return (
        <>
            <button className={'btn'} onClick={increment}>Increment the number</button>
            <h1 style={{textAlign:'center'}}>{count}</h1>
            </>
    );
};

export default Counter;