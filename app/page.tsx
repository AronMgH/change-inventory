import { CounterDiv } from '@/components/miela/counter';
import { User } from '@/components/miela/user';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { json } from 'stream/consumers';
import { Signin, Signout } from '@/components/miela/sign_user';
import { redirect } from 'next/navigation';

export default async function  PlayLayout() {
    const session = await getServerSession(authOptions)
    redirect('/dashboard')
    return (
    <div className='w-1/8 my-8 mx-8 flex flex-col items-center justify-center'>
        <h1>Hello World, this is playground;</h1>
        <CounterDiv></CounterDiv>
        <small>Server Session info: {JSON.stringify(session)}</small>
        <User />
        <div className='mt-5'>
        <Signout />
          <Signin />
        </div>
    </div>);
}