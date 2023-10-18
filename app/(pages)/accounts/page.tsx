'use client'
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "./loading";

export default  function AccountsPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () =>{
      const response = await fetch(`/api/user`)
      const data = await response.json()
      setAccounts(data)
      setIsLoading(false)
    }
    console.log('fetching accounts',accounts)
    fetchData()

  }, [])
  
  return (
    <div>
      {
        !isLoading 
        ? <DataTable columns={columns} data={accounts} />
        : <Loading />
      }
    </div>
  );
}