import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){
    const session =  await getServerSession(authOptions)
    console.log(session);
    if(!session){
        return new NextResponse(JSON.stringify({error: 'Unauthorized Request'}), {status:401})
    }
    return NextResponse.json({authenticated: !!session});
}
export async function POST() {
    
}