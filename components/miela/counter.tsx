'use client';
import { useEffect, useState } from "react";

export const CounterDiv =  function PlayLayout() {

    let showGratitude = false;

    let [count, setCount] = useState(0);
    let [version, setVersion] = useState(0);
    
    function increment(){
        setCount(count++);
    }

    function decrement(){
        setCount(prevCounter => prevCounter--);
    }

    function setUpdate(){
        setVersion(version => version + 0.1);
    }
    useEffect(() =>{
        showGratitude = true;
        setTimeout(()=>{
            // showGratitude = false
        }, 1000);

    }
    ,[version]);
    return (
    <div className="text-center">  
        <p>running for {version} times</p>
    <div className="flex justify-center">
        <h1 className="text-[180px]">{count}</h1>
    </div >
    <button onClick={decrement} className="m-2 p-2 bg-slate-700 hover:bg-slate-900 rounded-xl text-white">Counter--</button>
    <button onClick={increment} className="m-2 p-2 bg-green-600 hover:bg-green-700 rounded-xl text-white">Counter++</button>
    <button onClick={setUpdate} className="m-2 p-2 bg-green-600 hover:bg-green-700 rounded-xl text-white">Update++</button>
    </div>);
}