import { Account, columns } from './columns'
import { DataTable } from './data-table'

async function getData() :Promise<Account[]> {
    return new Promise( (resolve, reject) => {
        const data:Account[] = [
                {
                  username: "user1",
                  fullname: "John Doe",
                  role: "Admin",
                  position: "Software Engineer",
                  email: "johndoe@example.com"
                },
                {
                  username: "user2",
                  fullname: "Jane Smith",
                  role: "Staff",
                  position: "Data Analyst",
                  email: "janesmith@example.com"
                },
                {
                  username: "user3",
                  fullname: "Robert Johnson",
                  role: "Staff",
                  position: "Product Manager",
                  email: "robertjohnson@example.com"
                },
                {
                  username: "user4",
                  fullname: "Mary Davis",
                  role: "Admin",
                  position: "UX Designer",
                  email: "marydavis@example.com"
                },
                {
                  username: "user5",
                  fullname: "James Brown",
                  role: "Staff",
                  position: "DevOps Engineer",
                  email: "jamesbrown@example.com"
                },
                {
                  username: "user6",
                  fullname: "Patricia Garcia",
                  role: "Admin",
                  position: "QA Engineer",
                  email: "patriciagarcia@example.com"
                },

        ]
        resolve(data)
    })

}
export default async function AccountsPage() {
    const data = await getData()
    return (
        <>
            <DataTable columns={columns} data={data}/>
        </>
    )
}