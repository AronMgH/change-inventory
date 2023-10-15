import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:Request){

}

export async function POST(req:NextRequest) {

    const body = await req.json()
    console.log(body)
    console.log(req.cookies.get('change-cookie'))
    return new NextResponse(JSON.stringify({body}))
    console.log('redirecting to google.')
    redirect('https://google.com')
}