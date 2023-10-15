'use client';

import { signIn, signOut} from 'next-auth/react';


export const Signin = function () {
    return (
        <button className="border px-5 py-1 mx-3 rounded-lg"onClick={()=> signIn()}>Sign in</button>
    );
}
export const Signout = function () {
    return(
        <button className="border px-5 py-1 mx-3 rounded-lg"onClick={()=> signOut()}>Sign Out</button>
    );
}