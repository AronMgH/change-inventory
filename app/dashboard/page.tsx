'use client';

import ToggleTheme from '@/components/miela/toggleTheme';
import { Button } from '@/components/ui/button'
import { useState } from 'react';

export default function Dashboard() {
    const [fres, setFres] = useState("")

    async function makePostRequest(){
        const res = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({text: 'hello world, this is next.js.'})
        }).then( async val => {
            let v = await val.json()
            setFres(JSON.stringify(v))
        } )
        
    }
    
    return (
        <>
        <div className='m-8'>
            Secret Dashbord page
            <br />
            <br />
            <Button onClick={() => makePostRequest()}>Post</Button>
            <p>{ fres }</p>
        </div>
        </>
        
    )
}