'use client';

import { useEffect } from "react";

export const InputEffect = function () {

    return (
        <>
            <button onClick={decrement} className="m-2 p-2 bg-slate-700 hover:bg-slate-900 rounded-xl text-white">Counter--</button>
            <button onClick={increment} className="m-2 p-2 bg-green-600 hover:bg-green-700 rounded-xl text-white">Counter++</button>
        
        </>
    );
} 

