import { columns, Activity } from './columns'
import { DataTable } from './data-table'

async function getData():Promise<Activity[]>    {
    
    const data: Activity[] = [
        { activityMessage: 'User logged in', activityType: 'Logged', createdAt: new Date().toString() },
        { activityMessage: 'Account created', activityType: 'Created', createdAt: new Date().toString() },
        { activityMessage: 'Post deleted', activityType: 'Deleted', createdAt: new Date().toString() },
        { activityMessage: 'Profile updated', activityType: 'Updated', createdAt: new Date().toString() },
        { activityMessage: 'User logged out', activityType: 'Logged', createdAt: new Date().toString() },
        { activityMessage: 'Password changed', activityType: 'Updated', createdAt: new Date().toString() },
        { activityMessage: 'Comment deleted', activityType: 'Deleted', createdAt: new Date().toString() },
        { activityMessage: 'New friend added', activityType: 'Created', createdAt: new Date().toString() },
        { activityMessage: 'User logged in', activityType: 'Logged', createdAt: new Date().toString() },
        { activityMessage: 'Post created', activityType: 'Created', createdAt: new Date().toString() }
    ];
    
    return new Promise((resolve, reject) => {
        resolve(data)
      })
}

export default async function HistoryPage() {
    const data = await getData()
    return (
        <>
            <DataTable columns={columns} data={data}/>
        </>
    )
}