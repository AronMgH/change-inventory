'use client';

import { useSession } from "next-auth/react";

export const User = function () {
    const {data:session} = useSession();

    return(
        <small>Client Session: {JSON.stringify(session)}</small>
    );
}